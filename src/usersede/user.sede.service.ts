import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { SedesService } from 'src/sedes/sedes.service';
import { USER_SEDE_REPOSITORY } from './user.sede.provider';
import { UserSede } from './user.sede.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/dtos';
import { ServiceErrors } from 'src/common/enums/errors';
import { User } from 'src/user/entities';

export enum UserServiceErrors {
	MAIL_ALREADY_EXISTS = 'MAIL_ALREADY_EXISTS',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
}

interface UserSedeResult {
	u_id: number;
	u_name: string;
	u_email: string;
	u_roles: string;
	u_status: number;
	id_sede: number;
}

export interface UserResult {
	id: number;
	name: string;
	email: string;
	roles: string;
	status: boolean;
}

@Injectable()
export class UserSedeService {
	constructor(
		@Inject(USER_SEDE_REPOSITORY)
		private userSedeRepository: Repository<UserSede>,
		private sedeService: SedesService,
		private userService: UserService,
	) {}

	async create(sedeId: number, dto: CreateUserDTO) {
		const sede = await this.sedeService.findOne({ id: sedeId });
		if (!sede) return ServiceErrors.OBJECT_NOT_EXIST;

		const result = await this.userService.create(dto);
		if (typeof result === 'string') return result;

		const userSede = await this.userSedeRepository
			.create({
				sede,
				user: result,
			})
			.save();

		const newUser = { ...result, sedes: [userSede] } as User;
		return newUser;
	}

	async findUsersByCityId(id: number) {
		const sedes = (
			await this.sedeService.findSedesByCityId(id, { select: ['id'] })
		).map((d) => d.id);
		return await this.findUsersBySedeIds(sedes);
	}

	async findUsersBySedeIds(sedes: number[]) {
		const usersSedes: UserSedeResult[] = await this.userSedeRepository
			.createQueryBuilder('us')
			.leftJoinAndSelect('us.user', 'u')
			.where('us.sede IN (:sedes)', { sedes })
			.select([
				'us.id_sede',
				'u.id',
				'u.name',
				'u.email',
				'u.roles',
				'u.status',
			])
			.getRawMany();

		return usersSedes
			.map((us) => ({
				user: {
					id: us.u_id,
					name: us.u_name,
					email: us.u_email,
					roles: us.u_roles,
					status: !!us.u_status,
				},
				idSede: us.id_sede,
			}))
			.reduce((result: { sede: number; users: UserResult[] }[], us) => {
				const sede = result.find((r) => r.sede === us.idSede);
				if (!sede)
					result.push({
						sede: us.idSede,
						users: [us.user],
					});
				else sede.users.push(us.user);
				return result;
			}, []);
	}
}

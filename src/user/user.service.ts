import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.provider';
import { User } from './entities';
import { CreateUserDTO } from './dtos';
import { EditUserDto } from './dtos/editUser.dto';
import { ServiceErrors } from 'src/common/enums/errors';

export enum UserServiceErrors {
	MAIL_ALREADY_EXISTS = 'MAIL_ALREADY_EXISTS',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
}

interface UserFindOne {
	id?: number;
	email?: string;
}

@Injectable()
export class UserService {
	constructor(
		@Inject(USER_REPOSITORY)
		private userRepository: Repository<User>,
	) {}

	async findAll() {
		return this.userRepository.find();
	}

	async findOne(data: UserFindOne) {
		return await this.userRepository
			.createQueryBuilder('user')
			.where(data)
			.addSelect('user.password')
			.getOne();
	}

	async findById(id: number) {
		return this.userRepository.findOne(id, {
			relations: ['sedes', 'sedes.sede', 'sedes.sede.city'],
		});
	}

	async findByEmail(email: string, query: object = {}) {
		return await this.userRepository.findOne({
			where: { email },
			...query,
		});
	}

	async validateExistUser(email: string) {
		const existUser = await this.findByEmail(email);
		return existUser && existUser.id;
	}

	async create(dto: CreateUserDTO) {
		const exist = await this.validateExistUser(dto.email);
		if (exist) return UserServiceErrors.MAIL_ALREADY_EXISTS;

		const { password, ...user } = await this.userRepository
			.create(dto)
			.save();
		return user;
	}

	async update(id: number, user: EditUserDto) {
		const userUpdate = await this.findOne({ id });
		if (!userUpdate) return UserServiceErrors.USER_NOT_FOUND;
		if (user.email) {
			if (userUpdate.email === user.email) delete user.email;
			else {
				const existUser = await this.validateExistUser(user.email);
				if (existUser) return UserServiceErrors.MAIL_ALREADY_EXISTS;
			}
		}

		Object.keys(user).forEach((key) => {
			userUpdate[key] = user[key];
		});
		return await this.userRepository.save(userUpdate);
	}
}

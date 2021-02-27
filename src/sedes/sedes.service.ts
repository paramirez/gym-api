import { Inject, Injectable } from '@nestjs/common';
import { CitiesService } from 'src/cities/cities.service';
import { ServiceErrors } from 'src/common/enums/errors';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateSedeDTO } from './dtos/create.sede.dto';
import { EditSedeDTO } from './dtos/edit.sede.dto';
import { Sede } from './entities/sede.entity';
import { SEDE_REPOSITORY } from './sede.provider';

interface SedeFindOne {
	id?: number;
	name?: string;
}

export enum SedesServiceErrors {
	LIMIT_USERS = 'LIMIT_USERS',
}

@Injectable()
export class SedesService {
	constructor(
		@Inject(SEDE_REPOSITORY) private sedeRepository: Repository<Sede>,
		private cityService: CitiesService,
	) {}

	async findSedesByCityId(id: number, options: FindManyOptions<Sede> = {}) {
		const query: FindManyOptions<Sede> = {
			where: { city: { id } },
			...options,
		};
		return this.sedeRepository.find(query);
	}

	async all(data = {}) {
		return await this.sedeRepository.find({
			where: { ...data },
			loadRelationIds: true,
		});
	}

	async findOne(sede: SedeFindOne) {
		return await this.sedeRepository.findOne(sede);
	}

	async create(dto: CreateSedeDTO) {
		const exist = await this.findOne({ name: dto.name });
		if (exist && exist.id) return ServiceErrors.OBJECT_ALREADY_EXITS;

		const city = await this.cityService.findOne({ id: dto.city });
		if (!city) return ServiceErrors.OBJECT_NOT_EXIST;

		const sede = this.sedeRepository.create({ ...dto, city });
		return await sede.save();
	}

	async update(id: number, dto: EditSedeDTO) {
		return (await this.sedeRepository.update({ id }, dto)).affected;
	}
}

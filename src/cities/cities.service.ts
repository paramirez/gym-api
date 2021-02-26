import { Inject, Injectable } from '@nestjs/common';
import { ServiceErrors } from 'src/common/enums/errors';
import { Repository } from 'typeorm';
import { CITY_REPOSITORY } from './city.provider';
import { CityDTO } from './dtos/city.dto';
import { City } from './entities/city.entity';

interface CityFindOne {
	id?: number;
	name?: string;
}

@Injectable()
export class CitiesService {
	constructor(
		@Inject(CITY_REPOSITORY) private cityRepository: Repository<City>,
	) {}

	async findAll() {
		return await this.cityRepository.find();
	}

	async findOne(city: CityFindOne) {
		return await this.cityRepository.findOne(city);
	}

	async create(city: CityDTO) {
		const exist = await this.findOne({ name: city.name });
		if (exist && exist.id) return ServiceErrors.OBJECT_ALREADY_EXITS;

		return await this.cityRepository.create(city).save();
	}

	async update(id: number, city: CityDTO) {
		const exist = await this.findOne({ name: city.name });
		if (exist && exist.id) return ServiceErrors.OBJECT_ALREADY_EXITS;

		return await (await this.cityRepository.update({ id }, city)).affected;
	}
}

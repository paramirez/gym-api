import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Admin, AnyRole } from 'src/common/decorators/auth.decorator';
import { isError } from 'src/common/errors/service.errors';
import { CitiesService } from './cities.service';
import { CityDTO } from './dtos/city.dto';
import { ApiTags } from '@nestjs/swagger';
import { City } from './entities/city.entity';
import {
	ResponseType,
	UpdateResponseType,
} from 'src/common/decorators/swagger.decorator';
import { MoreThan } from 'typeorm';

@ApiTags('Cities routes')
@Controller('cities')
export class CitiesController {
	constructor(private citiesService: CitiesService) {}

	@ResponseType([City])
	@Admin()
	@Get('all')
	async allAdmin() {
		return await this.citiesService.findAll({
			cache: true,
		});
	}

	@ResponseType([City])
	@Get('withsedes')
	async allWithSedes() {
		return await this.citiesService.findAll({
			where: {
				sedesCounter: MoreThan(0),
			},
		});
	}

	@ResponseType([City])
	@Get()
	async all() {
		return this.citiesService.findAll({
			select: ['id', 'name'],
		});
	}

	@ResponseType(City)
	@Admin()
	@Post()
	async create(@Body() city: CityDTO) {
		const result = await this.citiesService.create(city);
		isError(result);
		return result;
	}

	@UpdateResponseType()
	@Admin()
	@Put(':id')
	async update(@Param('id') id: number, @Body() city: CityDTO) {
		const updated = await this.citiesService.update(id, city);
		isError(updated);
		return { updated };
	}
}

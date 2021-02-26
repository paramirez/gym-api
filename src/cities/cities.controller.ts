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

@ApiTags('Cities routes')
@Controller('cities')
export class CitiesController {
	constructor(private citiesService: CitiesService) {}

	@ResponseType([City])
	@AnyRole()
	@Get()
	async all() {
		return this.citiesService.findAll();
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

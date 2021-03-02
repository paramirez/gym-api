import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Admin } from 'src/common/decorators/auth.decorator';
import { isError } from 'src/common/errors/service.errors';
import { CreateSedeDTO } from './dtos/create.sede.dto';
import { SedesService } from './sedes.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseType } from 'src/common/decorators/swagger.decorator';
import { Sede } from './entities/sede.entity';

@ApiTags('Sedes routes')
@Controller('sedes')
export class SedesController {
	constructor(private sedesService: SedesService) {}

	@ResponseType(Sede)
	@Admin()
	@Post()
	async create(@Body() sede: CreateSedeDTO) {
		const result = await this.sedesService.create(sede);
		isError(result);
		return result;
	}

	@ResponseType([Sede])
	@Admin()
	@Get('admin/city/:city')
	async getSedesByCityId(@Param('city') city: number) {
		return await this.sedesService.all({ city });
	}

	@ResponseType([Sede])
	@Get('city/:city')
	async getByCityId(@Param('city') city: number) {
		return await this.sedesService.all(
			{ city },
			{
				select: ['id', 'name'],
			},
		);
	}

	@ResponseType([Sede])
	@Admin()
	@Get('/users')
	async getAllWithUsers() {
		return await this.sedesService.all({}, { loadRelationIds: true });
	}

	@ResponseType([Sede])
	@Admin()
	@Get('all')
	async getSedeAll() {
		return await this.sedesService.all(
			{},
			{
				relations: ['city'],
				cache: true,
			},
		);
	}

	@ResponseType(Sede)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		return { sede: (await this.sedesService.findOne({ id })) || {} };
	}

	@ResponseType([Sede])
	@Get()
	async getAll() {
		return await this.sedesService.all(
			{},
			{
				select: ['id', 'name'],
				cache: true,
			},
		);
	}
}

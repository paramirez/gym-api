import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/common/decorators/auth.decorator';
import { ResponseType } from 'src/common/decorators/swagger.decorator';
import { AppRoles } from 'src/common/enums/roles';
import { isError } from 'src/common/errors/service.errors';
import { CreateUserDTO } from 'src/user/dtos';
import { User } from 'src/user/entities';
import { UserSedeService } from './user.sede.service';

@ApiTags('Creación de usuarios')
@Controller('sedes/users')
export class UserSedeController {
	constructor(private userSedeService: UserSedeService) {}

	@ResponseType(User)
	@Post(':sede')
	async create(@Param('sede') sede: number, @Body() user: CreateUserDTO) {
		user.roles = [AppRoles.NORMAL];
		const result = await this.userSedeService.create(sede, user);
		isError(result);
		return result;
	}

	@Admin()
	@Get('sede/:id')
	async getUsersBySedeId(@Param('id') id: number) {
		return await this.userSedeService.findUsersBySedeIds([id]);
	}

	@Admin()
	@Get('city/:id')
	async getUsersByCityId(@Param('id') id: number) {
		return await this.userSedeService.findUsersByCityId(id);
	}
}

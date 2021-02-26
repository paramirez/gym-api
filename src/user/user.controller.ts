import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { Admin, AnyRole } from 'src/common/decorators/auth.decorator';
import { Payload } from 'src/common/decorators/payload.decorator';
import { AppRoles } from 'src/common/enums/roles';
import { isError } from 'src/common/errors/service.errors';
import { CreateUserDTO } from './dtos';
import { EditUserDto } from './dtos/editUser.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
	ResponseType,
	UpdateResponseType,
} from 'src/common/decorators/swagger.decorator';
import { User } from './entities';

@ApiTags('User routes')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@ResponseType([User])
	@Admin()
	@Get()
	async getAll() {
		return this.userService.findAll();
	}

	@ResponseType(User)
	@AnyRole()
	@Get(':id')
	async getById(
		@Param('id') id: number,
		@Payload('isAdmin') isAdmin: boolean,
		@Payload('sub') sub: number,
	) {
		if (!isAdmin && sub != id) throw new ForbiddenException();
		return { user: (await this.userService.findById(id)) || {} };
	}

	@UpdateResponseType()
	@AnyRole()
	@Put(':id')
	async updateUserById(
		@Param('id') id: number,
		@Payload('isAdmin') isAdmin: boolean,
		@Payload('sub') sub: number,
		@Body() user: EditUserDto,
	) {
		if (!isAdmin) {
			if (sub != id) throw new ForbiddenException();
			else if (user.roles) throw new ForbiddenException('roles');
		}

		const updated = await this.userService.update(id, user);
		isError(updated);
		return { updated };
	}

	@ApiOperation({ description: 'Disable user', summary: 'Disable user' })
	@Admin()
	@Delete(':id')
	async disable(@Param('id') id: number) {
		const updated = await this.userService.update(id, {
			status: false,
		} as EditUserDto);
		isError(updated);
		return;
	}

	@ApiOperation({ description: 'Enabled user', summary: 'Enable user' })
	@Admin()
	@Patch(':id')
	async enable(@Param('id') id: number) {
		const updated = await this.userService.update(id, {
			status: true,
		} as EditUserDto);
		isError(updated);
		return;
	}
}

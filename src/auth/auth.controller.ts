import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { LoginDTO, LoginResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
	constructor(private service: AuthService) {}

	@Post('login')
	@ApiResponse({
		type: LoginResponseDTO,
	})
	async login(@Body() auth: LoginDTO) {
		const validUser = await this.service.validateUser(auth);
		if (typeof validUser === 'string')
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: validUser,
				},
				HttpStatus.BAD_REQUEST,
			);
		else return this.service.login(validUser);
	}
}

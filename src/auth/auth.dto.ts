import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	readonly password: string;
}

export class LoginResponseDTO {
	@ApiProperty()
	access_token: string;
}

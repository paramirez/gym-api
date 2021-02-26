import {
	IsArray,
	IsEmail,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import { AppRoles } from 'src/common/enums/roles';
import { EnumToString } from 'src/common/helpers/enumToString';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class CreateUserDTO {
	@IsOptional()
	@IsString()
	@MaxLength(500)
	@ApiProperty()
	readonly name: string;

	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(128)
	@ApiProperty()
	readonly password: string;

	@IsArray()
	@IsOptional()
	@IsEnum(AppRoles, {
		each: true,
		message: `use a valid roles, ${EnumToString(AppRoles)}`,
	})
	@ApiProperty({
		type: [],
		default: [AppRoles.NORMAL],
		enum: AppRoles,
		required: false,
		description: 'Only use by ADMIN role',
	})
	roles: string[];
}

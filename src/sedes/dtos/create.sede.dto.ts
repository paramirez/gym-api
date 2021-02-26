import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSedeDTO {
	@IsString()
	@MinLength(4)
	@MaxLength(240)
	@ApiProperty()
	name: string;

	@IsNumber()
	@ApiProperty()
	@Min(1)
	city: number;
}

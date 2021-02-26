import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CityDTO {
	@IsString()
	@ApiProperty()
	readonly name: string;
}

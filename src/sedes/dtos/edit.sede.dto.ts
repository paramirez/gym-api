import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class EditSedeDTO {
	@IsString()
	@MinLength(4)
	@MaxLength(240)
	name: string;

	@Min(1)
	@Max(300)
	userCounter: number;
}

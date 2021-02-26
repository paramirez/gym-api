import { ApiResponseProperty } from '@nestjs/swagger';

export class UpdateResponse {
	@ApiResponseProperty()
	readonly updated: number;
}

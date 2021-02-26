import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateResponse } from '../dtos/response.dto';

export function ResponseType(
	type: Type<unknown> | Function | [Function] | string,
	status: number = 200,
) {
	return applyDecorators(
		ApiResponse({
			status,
			type,
		}),
	);
}

export function UpdateResponseType() {
	return applyDecorators(ResponseType(UpdateResponse));
}

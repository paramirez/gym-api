import { HttpException, HttpStatus } from '@nestjs/common';

export function badRequest(error) {
	throw new HttpException(
		{
			status: HttpStatus.BAD_REQUEST,
			error,
		},
		HttpStatus.BAD_REQUEST,
	);
}

export function isError(result: any) {
	if (typeof result === 'string') badRequest(result);
}

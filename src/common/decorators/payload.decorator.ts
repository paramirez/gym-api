import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.service';
import { AppRoles } from '../enums/roles';

export const Payload = createParamDecorator<
	string,
	ExecutionContext,
	JwtPayload
>((data, ctx) => {
	const request = ctx.switchToHttp().getRequest();
	const user: JwtPayload = request.user;

	return data ? user[data] : user;
});

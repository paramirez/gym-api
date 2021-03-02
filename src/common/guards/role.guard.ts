import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/auth/auth.service';
import { AppRoles } from '../enums/roles';

function matchRoles(roles: string[], appRoles: AppRoles[]): boolean {
	return appRoles.some((role) => roles.includes(role));
}

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		ctx: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<AppRoles[]>('roles', ctx.getHandler());
		if (!roles) return true;

		const request = ctx.switchToHttp().getRequest();
		const user: JwtPayload = request.user;
		if (!user) throw new UnauthorizedException();
		return matchRoles(user.roles, roles);
	}
}

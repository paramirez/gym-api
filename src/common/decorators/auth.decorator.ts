import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/auth.guard';
import { AppRoles } from '../enums/roles';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from './role.decorator';

export function Auth(...roles: AppRoles[]) {
	return applyDecorators(
		Roles(...roles),
		UseGuards(JwtGuard, RoleGuard),
		ApiBearerAuth(),
	);
}

export function AnyRole() {
	return Auth(AppRoles.ADMIN, AppRoles.NORMAL);
}

export function Admin() {
	return Auth(AppRoles.ADMIN);
}

export function Normal() {
	return Auth(AppRoles.NORMAL);
}

import { SetMetadata } from '@nestjs/common';
import { AppRoles } from '../enums/roles';

export const Roles = (...roles: AppRoles[]) => SetMetadata('roles', roles);

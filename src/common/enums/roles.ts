export enum AppRoles {
	NORMAL = 'NORMAL',
	ADMIN = 'ADMIN',
}

export const SUPERADMIN = [AppRoles.ADMIN, AppRoles.NORMAL];

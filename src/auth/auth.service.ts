import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { UserService, UserServiceErrors } from 'src/user/user.service';
import { LoginDTO, LoginResponseDTO } from './auth.dto';

enum ServiceErrors {
	INVALID_PASSWORD = 'INVALID_PASSWORD',
	USER_IS_DISABLE = 'USER_IS_DISABLE',
}

export const AuthServiceErrors = { ...ServiceErrors, ...UserServiceErrors };

export interface JwtPayload {
	email: string;
	sub: number;
	roles: string[];
	name: string;
	isAdmin?: boolean;
}

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(login: LoginDTO) {
		const user = await this.userService.findOne({ email: login.email });
		if (!user) return AuthServiceErrors.USER_NOT_FOUND;
		if (!user.status) return AuthServiceErrors.USER_IS_DISABLE;

		const compare = compareSync(login.password, user.password);
		if (!compare) return AuthServiceErrors.INVALID_PASSWORD;

		const { password, ...result } = user;
		return result as User;
	}

	async login(user: User) {
		const payload: JwtPayload = {
			email: user.email,
			sub: user.id,
			roles: user.roles,
			name: user.name,
		};

		return plainToClass(LoginResponseDTO, {
			access_token: this.jwtService.sign(payload),
		});
	}
}

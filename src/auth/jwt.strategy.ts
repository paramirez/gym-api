import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppRoles } from 'src/common/enums/roles';
import { secret } from './auth.constants';
import { JwtPayload } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret,
		});
	}

	async validate(payload: JwtPayload) {
		return { ...payload, isAdmin: payload.roles.includes(AppRoles.ADMIN) };
	}
}

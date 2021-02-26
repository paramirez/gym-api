import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/database/database.providers';
import { UserSede } from './user.sede.entity';

export const USER_SEDE_REPOSITORY = 'USER_SEDE_REPOSITORY';

export const userSedeProvider = [
	{
		provide: USER_SEDE_REPOSITORY,
		useFactory: (conn: Connection) => conn.getRepository(UserSede),
		inject: [DATABASE_CONNECTION],
	},
];

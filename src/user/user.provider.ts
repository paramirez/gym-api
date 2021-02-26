import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/database/database.providers';
import { User } from './entities';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const userProvider = [
	{
		provide: USER_REPOSITORY,
		useFactory: (conn: Connection) => conn.getRepository(User),
		inject: [DATABASE_CONNECTION],
	},
];

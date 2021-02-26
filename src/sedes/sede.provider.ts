import { DATABASE_CONNECTION } from 'src/database/database.providers';
import { Connection } from 'typeorm';
import { Sede } from './entities/sede.entity';

export const SEDE_REPOSITORY = 'SEDE_REPOSITORY';

export const sedeProvider = [
	{
		provide: SEDE_REPOSITORY,
		useFactory: (conn: Connection) => conn.getRepository(Sede),
		inject: [DATABASE_CONNECTION],
	},
];

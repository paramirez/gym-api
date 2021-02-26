import { DATABASE_CONNECTION } from 'src/database/database.providers';
import { Connection } from 'typeorm';
import { City } from './entities/city.entity';

export const CITY_REPOSITORY = 'CITY_REPOSITORY';

export const cityProvider = [
	{
		provide: CITY_REPOSITORY,
		useFactory: (conn: Connection) => conn.getRepository(City),
		inject: [DATABASE_CONNECTION],
	},
];

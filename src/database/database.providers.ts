import { createConnection, getConnectionOptions } from 'typeorm';
import { join } from 'path';

function getRoute(distRoute: string) {
	return join(__dirname, '..' + distRoute.toString().replace('dist', ''));
}

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const databaseProviders = [
	{
		provide: DATABASE_CONNECTION,
		useFactory: async () => {
			const config = await getConnectionOptions();
			const newConfig = {
				...config,
				entities: config.entities.map((map) => getRoute(map as string)),
				migrations: config.migrations.map((map) =>
					getRoute(map as string),
				),
				subscribers: config.subscribers.map((map) =>
					getRoute(map as string),
				),
			};
			return await createConnection(newConfig);
		},
	},
];

import { ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { databaseProviders } from './database/database.providers';

export function mockModuleTypeORM(options: ModuleMetadata = {}) {
	return Test.createTestingModule({
		...options,
		providers: [...databaseProviders, ...options.providers],
	});
}

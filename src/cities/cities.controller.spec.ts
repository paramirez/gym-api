import { HttpException, HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { ServiceErrors } from 'src/common/enums/errors';
import { Sede } from 'src/sedes/entities/sede.entity';
import { mockModuleTypeORM } from 'src/testing.module.builder';
import { getConnection, Repository } from 'typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { cityProvider } from './city.provider';
import { City } from './entities/city.entity';

describe('CitiesController /cities', () => {
	let controller: CitiesController;
	let module: TestingModule;
	let repo: Repository<City>;
	let repoSede: Repository<Sede>;

	beforeEach(async (done) => {
		try {
			module = await mockModuleTypeORM({
				providers: [...cityProvider, CitiesService],
				controllers: [CitiesController],
			}).compile();

			controller = module.get<CitiesController>(CitiesController);

			repo = getConnection().getRepository(City);
			repoSede = getConnection().getRepository(Sede);
			await repo.save({
				name: 'Prueba',
			});
		} catch (error) {
			console.log(error);
		}
		done();
	});

	afterEach(async (done) => {
		const connection = getConnection();
		if (connection && connection.close) await connection.close();
		if (module && module.close) await module.close();
		done();
	});

	it('get => /', async () => {
		expect(await controller.all()).toEqual([
			repo.create({
				id: 1,
				name: 'Prueba',
			}),
		]);
	});

	it('get => /all', async () => {
		expect(await controller.allAdmin()).toEqual([
			repo.create({
				id: 1,
				name: 'Prueba',
				sedesCounter: 0,
				userCounter: 0,
			}),
		]);
	});

	it('get => /withsedes, (empty)', async () => {
		expect(await controller.allWithSedes()).toEqual([]);
	});

	it('get => /withsedes (with sedes)', async () => {
		await repoSede
			.create({
				city: repo.create({
					id: 1,
					name: 'Prueba',
					sedesCounter: 0,
					userCounter: 0,
				}),
				name: 'Sede 1',
			})
			.save();

		expect(await controller.allWithSedes()).toEqual([
			repo.create({
				id: 1,
				name: 'Prueba',
				userCounter: 0,
				sedesCounter: 1,
			}),
		]);
	});

	it('post => / (City already exists, BAD_REQUEST, OBJECT_ALREADY_EXITS)', async () => {
		try {
			await controller.create({ name: 'Prueba' });
			throw new Error('No pasa');
		} catch (error) {
			if (error instanceof HttpException) {
				expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect(error.getResponse() instanceof Object).toBe(true);
				expect(error.getResponse()).toEqual({
					status: HttpStatus.BAD_REQUEST,
					error: ServiceErrors.OBJECT_ALREADY_EXITS,
				});
			} else throw error;
		}
	});

	it('post => / (Success)', async () => {
		expect(await controller.create({ name: 'Prueba2' })).toEqual({
			name: 'Prueba2',
			id: 2,
			userCounter: 0,
			sedesCounter: 0,
		});
	});

	it('put => /:id (City already exists, BAD_REQUEST, OBJECT_ALREADY_EXITS)', async () => {
		try {
			await repo
				.create({
					name: 'Prueba2',
				})
				.save();
			await controller.update(1, { name: 'Prueba2' });
			throw new Error('No pasa');
		} catch (error) {
			if (error instanceof HttpException) {
				expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
				expect(error.getResponse() instanceof Object).toBe(true);
				expect(error.getResponse()).toEqual({
					status: HttpStatus.BAD_REQUEST,
					error: ServiceErrors.OBJECT_ALREADY_EXITS,
				});
			} else throw error;
		}
	});

	it('put => /:id (Success)', async () => {
		expect(await controller.update(1, { name: 'Prueba2' })).toEqual({
			updated: 1,
		});
	});
});

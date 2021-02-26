import { getRepository } from 'typeorm';
import { User } from 'src/user/entities';
import { AppRoles } from 'src/common/enums/roles';
import { City } from 'src/cities/entities/city.entity';
import { Sede } from 'src/sedes/entities/sede.entity';

const setDefaultUser = async () => {
	const userRepository = getRepository<User>(User);
	const cityRepository = getRepository<City>(City);
	const sedeRepository = getRepository<Sede>(Sede);

	const city = 'CIUDAD_INICIAL';
	let defaultCity = await cityRepository.findOne({ name: city });
	if (!(defaultCity && defaultCity.id)) {
		defaultCity = await cityRepository
			.create({
				name: city,
			})
			.save();
	}

	const sede = 'SEDE_INICIAL';
	let defaultSede = await sedeRepository.findOne({ name: sede });
	if (!defaultSede) {
		defaultSede = await sedeRepository
			.create({
				name: sede,
				city: defaultCity,
			})
			.save();
	}

	const defaultUser = await userRepository
		.createQueryBuilder()
		.where('email = :email', {
			email: process.env.DEFAULT_USER_EMAIL,
		})
		.getOne();

	if (!defaultUser) {
		const adminUser = userRepository.create({
			name: 'Admin',
			email: process.env.DEFAULT_USER_EMAIL,
			password: process.env.DEFAULT_USER_PASS,
			roles: [AppRoles.ADMIN],
		});

		await userRepository.save(adminUser);
	}
};

export default setDefaultUser;

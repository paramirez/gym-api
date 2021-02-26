import { ApiResponseProperty } from '@nestjs/swagger';
import { City } from 'src/cities/entities/city.entity';
import { UserSede } from 'src/usersede/user.sede.entity';

import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Sede' })
export class Sede extends BaseEntity {
	@ApiResponseProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiResponseProperty()
	@Column({ type: 'varchar', length: 240, unique: true })
	name: string;

	@ApiResponseProperty({ type: () => City })
	@ManyToOne(() => City, (city) => city.sedes)
	@JoinColumn({ name: 'id_city' })
	city: City;

	@OneToMany(() => UserSede, (userSede) => userSede.sede)
	users: UserSede[];
}

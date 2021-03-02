import { ApiResponseProperty } from '@nestjs/swagger';
import { City } from 'src/cities/entities/city.entity';
import { UserSede } from 'src/usersede/user.sede.entity';

import {
	AfterLoad,
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
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

	@Column({ type: 'int', default: 0 })
	userCounter: number;

	@ApiResponseProperty({ type: () => City })
	@ManyToOne(() => City, (city) => city.sedes)
	@JoinColumn({ name: 'id_city' })
	city: City;

	@OneToMany(() => UserSede, (userSede) => userSede.sede)
	users: UserSede[];

	private userCounterTemp: number;

	@AfterLoad()
	afterUpdate() {
		this.userCounterTemp = this.userCounter;
	}

	@BeforeInsert()
	async insert() {
		const city = this.city;
		city.sedesCounter = city.sedesCounter + 1;
		return await city.save();
	}

	@BeforeUpdate()
	async update() {
		if (this.userCounterTemp === this.userCounter) return;

		const city = this.city;
		city.userCounter++;
		return await city.save();
	}
}

import { ApiResponseProperty } from '@nestjs/swagger';
import { Sede } from 'src/sedes/entities/sede.entity';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'City' })
export class City extends BaseEntity {
	@ApiResponseProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiResponseProperty()
	@Column({ type: 'varchar', length: 128, unique: true })
	name: string;

	@Column({ type: 'int', default: 0 })
	userCounter: number;

	@Column({ type: 'int', default: 0 })
	sedesCounter: number;

	@ApiResponseProperty({ type: [Sede] })
	@OneToMany(() => Sede, (sede) => sede.city)
	sedes: Sede[];
}

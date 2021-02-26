import { ApiResponseProperty } from '@nestjs/swagger';
import { Sede } from 'src/sedes/entities/sede.entity';
import { User } from 'src/user/entities';
import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'UserSede' })
export class UserSede extends BaseEntity {
	@ApiResponseProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.sedes)
	@JoinColumn({ name: 'id_user' })
	user: User;

	@ManyToOne(() => Sede, (sede) => sede.users)
	@JoinColumn({ name: 'id_sede' })
	sede: Sede;
}

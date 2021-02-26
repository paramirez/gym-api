import { ApiResponseProperty } from '@nestjs/swagger';
import { hashSync } from 'bcrypt';
import { UserSede } from 'src/usersede/user.sede.entity';
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User extends BaseEntity {
	@ApiResponseProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiResponseProperty()
	@Column({ length: 500 })
	name: string;

	@ApiResponseProperty()
	@Column({ type: 'varchar', length: 255, nullable: false })
	email: string;

	@Column({ type: 'varchar', length: 128, nullable: false, select: false })
	password: string;

	@ApiResponseProperty()
	@Column({ type: 'simple-array' })
	roles: string[];

	@ApiResponseProperty()
	@Column({ type: 'bool', default: true })
	status: boolean;

	@ApiResponseProperty()
	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@ApiResponseProperty()
	@OneToMany(() => UserSede, (userSede) => userSede.user)
	sedes: UserSede[];

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (!this.password) return;
		this.password = await hashSync(this.password, 10);
	}
}

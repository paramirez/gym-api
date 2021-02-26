import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SedesModule } from 'src/sedes/sedes.module';
import { UserModule } from 'src/user/user.module';
import { UserSedeController } from './user.sede.controller';
import { userSedeProvider } from './user.sede.provider';
import { UserSedeService } from './user.sede.service';

@Module({
	imports: [DatabaseModule, UserModule, SedesModule],
	providers: [...userSedeProvider, UserSedeService],
	controllers: [UserSedeController],
	exports: [...userSedeProvider, UserSedeService],
})
export class UserSedeModule {}

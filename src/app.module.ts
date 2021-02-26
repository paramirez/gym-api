import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { SedesModule } from './sedes/sedes.module';
import { UserSedeModule } from './usersede/user.sede.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		AuthModule,
		CitiesModule,
		SedesModule,
		UserSedeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [...userProvider, UserService],
	exports: [...userProvider, UserService],
})
export class UserModule {}

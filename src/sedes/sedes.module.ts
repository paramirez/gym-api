import { Module } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { SedesController } from './sedes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CitiesModule } from 'src/cities/cities.module';
import { sedeProvider } from './sede.provider';

@Module({
	imports: [DatabaseModule, CitiesModule],
	providers: [...sedeProvider, SedesService],
	exports: [...sedeProvider, SedesService],
	controllers: [SedesController],
})
export class SedesModule {}

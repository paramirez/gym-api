import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { cityProvider } from './city.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [...cityProvider, CitiesService],
	exports: [...cityProvider, CitiesService],
	controllers: [CitiesController],
})
export class CitiesModule {}

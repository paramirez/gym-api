import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import setDefaultUser from './scripts/setDefaultUser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	initSwagger(app);
	await setDefaultUser();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	await app.listen(3000);
}
bootstrap();

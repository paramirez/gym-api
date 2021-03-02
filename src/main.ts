import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import setDefaultUser from './scripts/setDefaultUser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	initSwagger(app);
	if (!!!process.env.OMIT_INITIAL_SCRIPT) await setDefaultUser();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.enableCors();
	await app.listen(3000);
}
bootstrap();

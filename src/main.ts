import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from 'environment/environment';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(environment.port);
}

bootstrap();

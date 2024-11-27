import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from 'environment/environment';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(environment.port);
  Logger.log(`Application running on http://localhost:${environment.port}`, 'Application');
}

bootstrap();

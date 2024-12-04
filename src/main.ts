import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from 'environment/environment';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(environment.port);
  Logger.debug(
    `Running on ${environment.host}:${environment.port}`,
    'Application',
  );
}

bootstrap();

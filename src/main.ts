import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environment/environment';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(environment.port);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { getEnv } from 'shared/utils';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: getEnv('CLIENT_URL'),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

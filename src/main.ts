import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import { CustomExceptionFilter } from './_common/exceptions/exception.filter';
import { exceptionFactory } from './_common/exceptions/exception.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: exceptionFactory,
  }));
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3001);
}
bootstrap();

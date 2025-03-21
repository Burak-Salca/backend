import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { setupSwagger } from './_config/swagger.config'; 
import { ValidationPipe } from '@nestjs/common';

import { CustomExceptionFilter } from './_common/exceptions/exception.filter';
import { exceptionFactory } from './_common/exceptions/exception.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: exceptionFactory,
  }));
  app.useGlobalFilters(new CustomExceptionFilter());
  app.enableCors();

  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();

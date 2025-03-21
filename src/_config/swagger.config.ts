import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Kurs Yönetim API')
    .setDescription('Kurs Yönetim Sistemi REST API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token'
    )
    .build();

  const options = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
    deepScanRoutes: true,
    ignoreGlobalPrefix: true
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Kurs Yönetim API Docs'
  });
}

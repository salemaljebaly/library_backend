import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://158.101.167.198:3000',
    allowedHeaders:'*'
  });
  const config = new DocumentBuilder()
  .setTitle(process.env.APP_NAME)
  .setDescription(process.env.APP_NAME + ' API description')
  .setVersion('1.0')
  .addTag(process.env.APP_NAME)
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  // add Global pipes to pass class validator
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();

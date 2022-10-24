import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { AppModule } from './tasks/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  
  app.useGlobalPipes(new ValidationPipe()) 

  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('Test task api')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api', app, document)

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

// const CLIENT_ID = '232118983482-7aehhja6qc5mbjlhn3rjbci05oiiej5h.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyCJH7D32GsKRqlBCHQtfZg8tTZUFDlLtFo';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.enableCors({
    origin: [
      'http://localhost:3006'
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })

  await app.listen(3000);
}
bootstrap();

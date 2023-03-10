import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import cors from 'cors';
// import { ValidationPipe } from './modules/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Video-chat backend')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Video - chat')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc);

  //  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();

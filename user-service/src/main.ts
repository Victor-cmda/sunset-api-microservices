import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.USER_QUEUE_NAME,
        queueOptions: {
          durable: process.env.QUEUE_DURABLE === 'true',
        },
      },
    },
  );
  app.listen();
}
bootstrap();

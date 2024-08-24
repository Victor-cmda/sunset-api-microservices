import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('USER_QUEUE_NAME'),
            queueOptions: {
              durable: configService.get<boolean>('QUEUE_DURABLE'),
            },
          },
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, ClientsModule],
})
export class UserModule {}

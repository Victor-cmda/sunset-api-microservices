import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoList, TodoItem } from './entity/todo.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoList, TodoItem]),
    ClientsModule.registerAsync([
      {
        name: 'TODO_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('TODO_QUEUE_NAME'),
            queueOptions: {
              durable: configService.get<boolean>('QUEUE_DURABLE'),
            },
          },
        }),
      },
    ]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

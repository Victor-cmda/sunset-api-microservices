import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'todo_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

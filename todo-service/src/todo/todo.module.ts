import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoList, TodoItem } from './entity/todo.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoList, TodoItem]),
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoList, TodoItem } from './entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoItem])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

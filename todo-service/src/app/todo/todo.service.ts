import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList, TodoItem } from './entity/todo.entity';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async createList(name: string, color: string, user: User) {
    const list = this.todoListRepository.create({ name, color, user });
    try {
      return await this.todoListRepository.save(list);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllLists(userId: string) {
    try {
      return await this.todoListRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateList(id: string, updateData: CreateTodoListDto) {
    try {
      return await this.todoListRepository.update(id, updateData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteList(id: string) {
    try {
      return await this.todoListRepository.softDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createItem(listId: string, name: string) {
    try {
      const item = this.todoItemRepository.create({
        name,
        todoList: { id: listId },
      });
      return await this.todoItemRepository.save(item);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateItem(id: number, updateData: CreateTodoItemDto) {
    try {
      return await this.todoItemRepository.update(id, updateData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteItem(id: number) {
    try {
      return await this.todoItemRepository.softDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

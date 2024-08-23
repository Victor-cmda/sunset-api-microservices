import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList, TodoItem } from './entity/todo.entity';
import { CreateTodoItemDto } from './dto/create-todo.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateTodoListDto } from './dto/update-todo.dto';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async createList(name: string, color: string, userId: string) {
    try {
      const list = this.todoListRepository.create({ name, color, userId });
      return await this.todoListRepository.save(list);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAllLists(userId: string) {
    try {
      return await this.todoListRepository.find({
        where: { userId },
        relations: ['items'],
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateList(id: string, updateData: UpdateTodoListDto): Promise<string> {
    try {
      const list = await this.todoListRepository.findOne({
        where: { id },
      });

      if (!list) throw new RpcException('Lista não encontrada.');

      await this.todoListRepository.update(id, updateData);

      return 'Lista atualizada com sucesso.';
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async deleteList(id: string) {
    try {
      const list = await this.todoListRepository.findOne({
        where: { id },
      });

      if (!list) throw new RpcException('Lista não encontrada.');

      await this.todoListRepository.softDelete(id);
      return `Lista com ID ${id} deletada com sucesso.`;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async createItem(listId: string, todoItem: CreateTodoItemDto) {
    try {
      const existingTodoList = await this.todoListRepository.findOne({
        where: { id: listId },
      });
      if (!existingTodoList) {
        throw new RpcException(
          'Lista de tarefas não encontrada com o ID informado',
        );
      }
      const item = this.todoItemRepository.create({
        name: todoItem.name,
        isDone: todoItem.isDone,
        todoList: { id: listId },
      });
      return await this.todoItemRepository.save(item);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async updateItem(id: string, updateData: CreateTodoItemDto) {
    try {
      const existingTodoItem = await this.todoItemRepository.findOne({
        where: { id },
      });
      if (!existingTodoItem) {
        throw new RpcException('Item não encontrado com o ID informado');
      }
      await this.todoItemRepository.update(id, updateData);
      return 'Item atualizado com sucesso.';
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async deleteItem(id: string) {
    try {
      const existingTodoItem = await this.todoItemRepository.findOne({
        where: { id },
      });
      if (!existingTodoItem) {
        throw new RpcException('Item não encontrado com o ID informado');
      }
      await this.todoItemRepository.softDelete(id);
      return 'Item deletado com sucesso.';
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}

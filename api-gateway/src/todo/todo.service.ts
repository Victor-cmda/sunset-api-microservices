import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { UpdateTodoListDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async createList(createListDto: CreateTodoListDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('create_list', createListDto),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllLists(userId: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('get_all_list', userId),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateList(id: string, todoListDto: UpdateTodoListDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('update_list', { id, todoListDto }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteList(userId: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('delete_list', userId),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createItem(listId: string, todoItemDto: CreateTodoItemDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('create_item', { listId, todoItemDto }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateItem(id: string, todoItemDto: CreateTodoItemDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('update_item', { id, todoItemDto }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteItem(id: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('delete_item', id),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { plainToInstance } from 'class-transformer';
import {
  ResponseTodoItemDto,
  ResponseTodoListDto,
} from './dto/response-todo.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { isUUID } from 'class-validator';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @MessagePattern('create_list')
  async createList(
    @Payload() payload: CreateTodoListDto,
  ): Promise<ResponseTodoListDto> {
    if (!payload.userId) {
      throw new RpcException('As senhas não coincidem');
    }
    const listItem = await this.todoService.createList(
      payload.name,
      payload.color,
      payload.userId,
    );
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @MessagePattern('get_all_list')
  async findAllLists(@Payload() userId: string) {
    if (!isUUID(userId))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');
    const listAll = await this.todoService.findAllLists(userId);

    return plainToInstance(ResponseTodoListDto, listAll);
  }

  @MessagePattern('update_list')
  async updateList(
    @Payload() payload: { id: string; todoListDto: CreateTodoListDto },
  ) {
    const { id, todoListDto } = payload;

    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    return await this.todoService.updateList(id, todoListDto);
  }

  @MessagePattern('delete_list')
  async deleteList(@Payload() id: string) {
    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    return await this.todoService.deleteList(id);
  }

  @MessagePattern('create_item')
  async createItem(
    @Payload() payload: { listId: string; todoItemDto: CreateTodoItemDto },
  ) {
    const { listId, todoItemDto } = payload;

    if (!isUUID(listId))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    const item = await this.todoService.createItem(listId, todoItemDto);
    return plainToInstance(ResponseTodoItemDto, item);
  }

  @MessagePattern('update_item')
  async updateItem(
    @Payload() payload: { id: string; todoItemDto: CreateTodoItemDto },
  ) {
    const { id, todoItemDto } = payload;
    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');
    const item = await this.todoService.updateItem(id, todoItemDto);
    return plainToInstance(ResponseTodoItemDto, item);
  }

  @MessagePattern('delete_item')
  async deleteItem(@Payload() id: string) {
    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');
    const item = await this.todoService.deleteItem(id);
    return plainToInstance(ResponseTodoItemDto, item);
  }
}

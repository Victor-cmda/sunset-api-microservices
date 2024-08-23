import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseTodoItemDto,
  ResponseTodoListDto,
} from './dto/response-todo.dto';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('list')
  @ApiOperation({ summary: 'Adiciona uma nova lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas criada com sucesso',
    type: ResponseTodoListDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async createUser(
    @Body() todoListDto: CreateTodoListDto,
  ): Promise<ResponseTodoListDto> {
    const result = await this.todoService.createList(todoListDto);
    return plainToInstance(ResponseTodoListDto, result);
  }

  @Get('lists/:userId')
  @ApiOperation({ summary: 'Consulta uma ou mais listas de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Listas de tarefas encontradas',
    type: ResponseTodoListDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Erro ao buscar listas de tarefas' })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada',
  })
  async findAllLists(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const listItem = await this.todoService.findAllLists(userId);
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @Put('list/:id')
  @ApiOperation({ summary: 'Atualiza/Altera uma nova lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas atualizada',
    type: ResponseTodoListDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada com o ID informado',
  })
  async updateList(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() todoListDto: CreateTodoListDto,
  ): Promise<string> {
    return await this.todoService.updateList(id, todoListDto);
  }

  @Delete('list/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Consulta uma ou mais listas de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Listas de tarefas encontradas',
    type: ResponseTodoListDto,
  })
  @ApiResponse({ status: 400, description: 'Erro ao buscar listas de tarefas' })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada',
  })
  async deleteLists(@Param('id', new ParseUUIDPipe()) id: string) {
    const listItem = await this.todoService.deleteList(id);
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @Post('item/:listId')
  @ApiOperation({ summary: 'Adiciona um novo item para lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Item adicionado com sucesso',
    type: CreateTodoItemDto,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async createItem(
    @Param('listId', new ParseUUIDPipe()) listId: string,
    @Body() todoItemDto: CreateTodoItemDto,
  ) {
    const item = await this.todoService.createItem(listId, todoItemDto);
    return plainToInstance(ResponseTodoItemDto, item);
  }

  @Put('item/:id')
  @ApiOperation({ summary: 'Atualiza/Altera um item da lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Item atualizado com sucesso',
    type: ResponseTodoItemDto,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum item encontrado com o ID informado',
  })
  async updateItem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() todoItemDto: CreateTodoItemDto,
  ) {
    return await this.todoService.updateItem(id, todoItemDto);
  }

  @Delete('item/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um item da lista de tarefas' })
  @ApiResponse({ status: 204, description: 'Item deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum item encontrado com o ID informado',
  })
  async deleteItem(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = await this.todoService.deleteItem(id);
    return plainToInstance(ResponseTodoItemDto, item);
  }
}

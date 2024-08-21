import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoItemDto, CreateTodoListDto } from './dto/create-todo.dto';
import { UpdateTodoItemDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryTodoDto } from './dto/query-todo.dto';
import {
  IndexTodoItemSwagger,
  IndexTodoListSwagger,
} from './swagger/index-todo.swagger';
import { plainToInstance } from 'class-transformer';
import {
  ResponseTodoItemDto,
  ResponseTodoListDto,
} from './dto/response-todo.dto';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('list')
  @ApiOperation({ summary: 'Adiciona uma nova lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas criada com sucesso',
    type: IndexTodoListSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async createList(@Body() body: CreateTodoListDto, @Req() req: any) {
    const listItem = await this.todoService.createList(
      body.name,
      body.color,
      req.user,
    );
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @Get('lists')
  @ApiOperation({ summary: 'Consulta uma ou mais listas de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Listas de tarefas encontradas',
    type: IndexTodoListSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Erro ao buscar listas de tarefas' })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada',
  })
  async findAllLists(@Query() query: QueryTodoDto, @Req() req: any) {
    const listItem = await this.todoService.findAllLists(req.user.userId);
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @Put('list/:id')
  @ApiOperation({ summary: 'Atualiza/Altera uma nova lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas atualizada',
    type: IndexTodoListSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada com o ID informado',
  })
  async updateList(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: CreateTodoListDto,
  ) {
    const listItem = await this.todoService.updateList(id, body);
    return plainToInstance(ResponseTodoListDto, listItem);
  }

  @Delete('list/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta uma lista de tarefas' })
  @ApiResponse({ status: 204, description: 'Lista de tarefas deletada' })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma lista de tarefas encontrada com o ID informado',
  })
  async deleteList(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.deleteList(id);
  }

  @Post('item/:listId')
  @ApiOperation({ summary: 'Adiciona um novo item para lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Item adicionado com sucesso',
    type: IndexTodoItemSwagger,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async createItem(
    @Param('listId', new ParseUUIDPipe()) listId: string,
    @Body() body: CreateTodoItemDto,
  ) {
    const item = await this.todoService.createItem(listId, body.name);
    return plainToInstance(ResponseTodoItemDto, item);
  }

  @Put('item/:id')
  @ApiOperation({ summary: 'Atualiza/Altera um item da lista de tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Item atualizado com sucesso',
    type: IndexTodoItemSwagger,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum item encontrado com o ID informado',
  })
  async updateItem(@Param('id') id: number, @Body() body: UpdateTodoItemDto) {
    const item = await this.todoService.updateItem(id, body);
    return plainToInstance(ResponseTodoItemDto, item);
  }

  @Delete('item/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um item da lista de tarefas' })
  @ApiResponse({ status: 204, description: 'Item deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum item encontrado com o ID informado',
  })
  async deleteItem(@Param('id') id: number) {
    const item = await this.todoService.deleteItem(id);
    return plainToInstance(ResponseTodoItemDto, item);
  }
}

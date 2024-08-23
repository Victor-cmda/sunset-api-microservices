import { OmitType } from '@nestjs/mapped-types';
import { CreateTodoItemDto, CreateTodoListDto } from './create-todo.dto';

export class UpdateTodoItemDto extends CreateTodoItemDto {}

export class UpdateTodoListDto extends OmitType(CreateTodoListDto, [
  'userId',
]) {}

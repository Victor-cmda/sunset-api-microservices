import { CreateTodoItemDto } from './create-todo.dto';
import { IsHexColor, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoItemDto extends CreateTodoItemDto {}

export class UpdateTodoListDto {
  @IsNotEmpty({
    message: 'Informe o nome da lista de tarefa',
  })
  @MaxLength(100, {
    message: 'O nome da lista de tarefa deve ter menos de 100 caracteres',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty({
    message: 'O campo de cor não pode estar vazio',
  })
  @IsHexColor({
    message: 'Informe uma cor hexadecimal válida',
  })
  @ApiProperty()
  color: string;
}

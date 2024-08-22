import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty({
    message: 'Informe o nome da tarefa',
  })
  @MaxLength(100, {
    message: 'O nome da tarefa deve ter menos de 100 caracteres',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  isDone: boolean;
}

export class CreateTodoListDto {
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

  @IsNotEmpty({
    message: 'O campo de cor não pode estar vazio',
  })
  @ApiProperty()
  @IsUUID()
  userId: string;
}

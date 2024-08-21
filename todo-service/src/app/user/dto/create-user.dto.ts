import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(100, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(100, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(50, {
    message: 'A senha deve ter no máximo 50 caracteres',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty({
    message: 'Informe a confirmação de senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(50, {
    message: 'A confirmação de senha deve ter no máximo 50 caracteres',
  })
  @ValidateIf((o: CreateUserDto) => o.password === o.passwordConfirmation)
  @ApiProperty()
  passwordConfirmation: string;
}

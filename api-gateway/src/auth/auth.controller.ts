import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Adiciona um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: 400, description: 'Erro ao adicionar novo usuário' })
  async registerUser(@Body() userDto: CreateUserDto): Promise<ResponseUserDto> {
    const result = await this.authService.registerUser(userDto);
    return plainToInstance(ResponseUserDto, result);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza login com as credenciais do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso',
    type: TokenDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado e/ou senha incorreta',
  })
  @ApiResponse({ status: 400, description: 'Erro ao realizar login' })
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const result = await this.authService.signIn(
      loginDto.email,
      loginDto.password,
    );
    return plainToInstance(TokenDto, result);
  }
}

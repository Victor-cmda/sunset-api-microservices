import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Adiciona um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: 400, description: 'Erro ao adicionar novo usuário' })
  async registerUser(@Body() userDto: CreateUserDto): Promise<ResponseUserDto> {
    const result = await this.userService.registerUser(userDto);
    return plainToInstance(ResponseUserDto, result);
  }

  @Post()
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.userService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Renovar o token' })
  async refreshToken(@Body() loginDto: LoginDto): Promise<any> {
    return await this.userService.login(loginDto);
  }
}

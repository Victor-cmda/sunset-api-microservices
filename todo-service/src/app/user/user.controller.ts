import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('api/v1/user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Adiciona um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: IndexUserSwagger,
  })
  @ApiResponse({ status: 400, description: 'Erro ao adicionar novo usuário' })
  async register(@Body() body: CreateUserDto): Promise<IndexUserSwagger> {
    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException('As senhas não coincidem');
    }
    const user = await this.userService.createUser(
      body.name,
      body.email,
      body.password,
    );
    return plainToInstance(ResponseUserDto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta um usuário por Id' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado com o ID informado',
  })
  @ApiResponse({ status: 400, description: 'Erro ao consultar usuário' })
  async getUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);
    return plainToInstance(ResponseUserDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza/Altera um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado com o ID informado',
  })
  @ApiResponse({ status: 400, description: 'Erro ao alterar usuário' })
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const user = await this.userService.updateUser(id, body);
    return plainToInstance(ResponseUserDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado com o ID informado',
  })
  @ApiResponse({ status: 400, description: 'Erro ao deletar usuário' })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteUser(id);
  }
}

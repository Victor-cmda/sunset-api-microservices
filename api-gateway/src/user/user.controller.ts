import {
  Controller,
  // Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiOperation({ summary: 'Adiciona um novo usuário' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Usuário criado com sucesso',
  //   type: ResponseUserDto,
  // })
  // @ApiResponse({ status: 400, description: 'Erro ao adicionar novo usuário' })
  // async createUser(@Body() userDto: CreateUserDto): Promise<ResponseUserDto> {
  //   const result = await this.userService.createUser(userDto);
  //   return plainToInstance(ResponseUserDto, result);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta um usuário por Id' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado com o ID informado',
  })
  @ApiResponse({ status: 400, description: 'Erro ao consultar usuário' })
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ResponseUserDto> {
    const result = await this.userService.getById(id);
    return plainToInstance(ResponseUserDto, result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza/Altera um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado com o ID informado',
  })
  @ApiResponse({ status: 400, description: 'Erro ao alterar usuário' })
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: CreateUserDto,
  ): Promise<string> {
    return await this.userService.updateUser(id, userDto);
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

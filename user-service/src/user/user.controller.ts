import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import { isUUID } from 'class-validator';
import { User } from './entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register_user')
  async registerUser(
    @Payload() payload: CreateUserDto,
  ): Promise<ResponseUserDto> {
    if (payload.password !== payload.passwordConfirmation) {
      throw new RpcException('As senhas não coincidem');
    }
    const user = await this.userService.createUser(
      payload.name,
      payload.email,
      payload.password,
    );
    return plainToInstance(ResponseUserDto, user);
  }

  @MessagePattern('get_user')
  async getUser(@Payload() data: { id: string }): Promise<ResponseUserDto> {
    const { id } = data;

    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    const user = await this.userService.findById(id);

    if (!user) throw new RpcException('Usuário não encontrado.');

    return plainToInstance(ResponseUserDto, user);
  }

  @MessagePattern('get_user_email')
  async getUserByEmail(@Payload() data: { email: string }): Promise<any> {
    const { email } = data;
    const user = await this.userService.findUserByEmail(email);

    return plainToInstance(User, user);
  }

  @MessagePattern('update_user')
  async updateUser(
    @Payload() payload: { id: string; userDto: CreateUserDto },
  ): Promise<string> {
    const { id, userDto } = payload;

    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    if (userDto.password !== userDto.passwordConfirmation) {
      throw new RpcException('As senhas não coincidem');
    }

    return await this.userService.updateUser(id, userDto);
  }

  @MessagePattern('delete_user')
  async deleteUser(@Payload() payload: { id: string }): Promise<string> {
    const { id } = payload;

    if (!isUUID(id))
      throw new RpcException('ID inválido. O ID deve ser um UUID.');

    return await this.userService.deleteUser(id);
  }
}

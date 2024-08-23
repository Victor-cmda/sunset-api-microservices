import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('register_user', createUserDto),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getById(id: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('get_user', { id }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByEmail(email: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('get_user_email', {
          email,
        }),
      );

      return response;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Erro ao buscar o usuário.',
      );
    }
  }

  async updateUser(id: string, userDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('update_user', { id, userDto }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('delete_user', { id }),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

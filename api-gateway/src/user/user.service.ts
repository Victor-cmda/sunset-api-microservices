import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from 'src/auth/dto/login.dto';
import { TokenDto } from 'src/auth/dto/token.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('create_user', createUserDto),
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

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('register_user', createUserDto),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('login', loginDto),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async refreshToken(createUserDto: CreateUserDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('refresh_token', createUserDto),
      );
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

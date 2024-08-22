import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('create_user')
  async register(@Payload() payload: CreateUserDto): Promise<ResponseUserDto> {
    if (payload.password !== payload.passwordConfirmation) {
      throw new RpcException('As senhas não coincidem');
    }
    const user = await this.authService.registerUser(
      payload.name,
      payload.email,
      payload.password,
    );
    return plainToInstance(ResponseUserDto, user);
  }

  @MessagePattern('create_user')
  signIn(@Payload() payload: Record<string, any>) {
    return this.authService.signIn(payload.username, payload.password);
  }
}

import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register_user')
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

  @MessagePattern('login')
  async signIn(@Payload() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto.email, loginDto.password);
  }

  @MessagePattern('refresh_token')
  async refreshToken(@Payload() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto.email, loginDto.password);
  }
}

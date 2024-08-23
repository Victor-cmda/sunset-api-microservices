import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { TokenDto } from './dto/token.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<TokenDto> {
    try {
      const user = await this.usersService.getByEmail(email);
      if (!user || !(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException();
      }
      const { ...result } = omit(user, ['password']);
      const payload = { email: result.email, sub: result.id };
      const token = this.jwtService.sign(payload);
      return plainToInstance(TokenDto, {
        access_token: token,
        expires_in: 3600,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const existingUser = await this.usersService.getByEmail(
        createUserDto.email,
      );

      if (existingUser)
        throw new NotFoundException('Usuário com este email já cadastrado.');

      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }
}

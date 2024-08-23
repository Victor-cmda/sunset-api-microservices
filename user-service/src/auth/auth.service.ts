import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<TokenDto> {
    try {
      const user = await this.usersService.findUserByEmail(email);
      console.log(user);
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
      throw new RpcException(error.message);
    }
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.usersService.findUserByEmail(email);

    if (existingUser) {
      throw new RpcException('Usuário com este email já cadastrado.');
    }
    return await this.usersService.createUser(name, email, password);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }
}

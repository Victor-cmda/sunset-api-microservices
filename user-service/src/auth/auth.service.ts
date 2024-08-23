import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    console.log(password);
    const payload = { email: result.email, sub: result.id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
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

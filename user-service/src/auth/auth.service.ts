import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    console.log(password);
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
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
}

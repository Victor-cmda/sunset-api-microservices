import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new RpcException('Usuário com este email já cadastrado.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<User[] | undefined> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async updateUser(id: string, userDto: CreateUserDto): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) throw new RpcException('Usuário não encontrado.');

      await this.userRepository.update(id, {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
      });

      return 'Usuário atualizado com sucesso.';
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) throw new RpcException('Usuário não encontrado.');

      await this.userRepository.softDelete(id);
      return `Usuário com ID ${id} deletado com sucesso.`;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) throw new RpcException('Usuário não encontrado.');
      return user;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

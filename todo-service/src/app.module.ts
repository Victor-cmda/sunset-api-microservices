import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItem, TodoList } from './todo/entity/todo.entity';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        schema: configService.get('DB_SCHEMA'),
        entities: [TodoItem, TodoList],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}

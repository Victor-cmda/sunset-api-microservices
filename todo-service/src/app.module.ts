import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItem, TodoList } from './todo/entity/todo.entity';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './src/.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '1234'),
        database: configService.get('DB_DATABASE', 'postgres'),
        schema: configService.get('DB_SCHEMA', 'public'),
        entities: [TodoItem, TodoList],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}

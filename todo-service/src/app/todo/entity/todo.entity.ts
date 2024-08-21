import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'todo_list' })
export class TodoList {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  color: string;

  @ManyToOne(() => User, (user) => user.todoLists)
  @ApiProperty()
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList)
  @ApiProperty()
  items: TodoItem[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;
}

@Entity({ name: 'todo_item' })
export class TodoItem {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ name: 'is_done', default: false })
  @ApiProperty()
  isDone: boolean;

  @ManyToOne(() => TodoList, (list) => list.items)
  @ApiProperty()
  todoList: TodoList;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;
}

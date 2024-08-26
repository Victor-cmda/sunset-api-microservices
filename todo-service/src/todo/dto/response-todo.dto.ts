import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseTodoListDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  color: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  deletedAt: string;

  @Expose()
  items: ResponseTodoItemDto[];
}

@Exclude()
export class ResponseTodoItemDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  isDone: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class QueryTodoDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly name?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  readonly isDone?: boolean;
}

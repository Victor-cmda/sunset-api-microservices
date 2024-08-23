import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenDto {
  @ApiProperty()
  @Expose()
  access_token: string;
  @Expose()
  @ApiProperty()
  expires_in: number;
}

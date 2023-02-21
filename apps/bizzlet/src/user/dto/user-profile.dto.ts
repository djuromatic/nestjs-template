import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserProfileDto {
  @ApiProperty()
  @IsString()
  @Expose()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @Expose()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @Expose()
  location?: string;
}

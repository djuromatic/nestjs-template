import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;
  @IsBoolean()
  isActive: boolean;
}
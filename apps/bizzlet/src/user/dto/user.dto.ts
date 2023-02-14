import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';

export class UserDto extends BaseDto {
  @IsNumber()
  @Expose()
  publicId: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  status: number;
}

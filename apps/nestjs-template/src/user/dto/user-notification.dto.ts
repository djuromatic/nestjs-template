import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  type: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  message: string;

  @IsNotEmpty()
  @Expose()
  metadata?: object;
}

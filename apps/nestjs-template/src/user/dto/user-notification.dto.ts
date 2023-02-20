import { Expose } from 'class-transformer';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  type: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  message: string;

  @IsNotEmpty()
  @IsJSON()
  @Expose()
  metadata: string;
}

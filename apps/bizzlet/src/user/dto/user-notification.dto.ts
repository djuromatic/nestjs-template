import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserNotificationDto {
  @ApiProperty({ type: 'uuid' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  type: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  message: string;

  @ApiPropertyOptional({ default: null, type: 'object' })
  @IsNotEmpty()
  @Expose()
  metadata?: object;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';

export class UserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

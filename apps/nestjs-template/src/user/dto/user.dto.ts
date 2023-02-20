import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'libs/database/adapter';
import { UserProfileDto } from './user-profile.dto';
import { UserSettingsDto } from './user-settings.dto';

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

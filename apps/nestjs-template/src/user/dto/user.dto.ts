import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';
import { UserProfileDto } from './user-profile.dto';
import { UserSettingsDto } from './user-settings.dto';

export class UserDto extends BaseDto {
  @IsString()
  @Expose()
  publicId: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  status: number;

  @Expose()
  profile?: UserProfileDto;

  @Expose()
  settings?: UserSettingsDto;
}

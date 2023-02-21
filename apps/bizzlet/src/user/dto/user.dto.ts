import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';
import { UserProfileDto } from './user-profile.dto';
import { UserSettingsDto } from './user-settings.dto';

export class UserDto extends BaseDto {
  @ApiProperty({ type: 'uuid' })
  @IsString()
  @Expose()
  publicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  status: number;

  @ApiProperty({ type: UserProfileDto })
  @Expose()
  profile?: UserProfileDto;

  @ApiProperty({ type: UserSettingsDto })
  @Expose()
  settings?: UserSettingsDto;
}

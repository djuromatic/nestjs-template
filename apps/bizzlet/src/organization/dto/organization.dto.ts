import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';
import { OrganizationProfileDto } from './organization-profile.dto';
import { OrganizationSettingsDto } from './organization-settings.dto';

export class OrganizationDto extends BaseDto {
  @IsString()
  @Expose()
  name?: string;

  @Expose()
  profile?: OrganizationProfileDto;

  @Expose()
  settings?: OrganizationSettingsDto;
}

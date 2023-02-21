import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';
import { OrganizationProfileDto } from './organization-profile.dto';
import { OrganizationSettingsDto } from './organization-settings.dto';

export class OrganizationDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @Expose()
  name?: string;

  @ApiPropertyOptional({ type: OrganizationProfileDto })
  @Expose()
  profile?: OrganizationProfileDto;

  @ApiPropertyOptional({ type: OrganizationSettingsDto })
  @Expose()
  settings?: OrganizationSettingsDto;
}

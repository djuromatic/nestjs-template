import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class OrganizationSettingsDto {
  @ApiPropertyOptional({ default: null })
  @IsString()
  @Expose()
  defaultCurrency?: string;

  @ApiPropertyOptional({ default: null, type: 'object' })
  @Expose()
  notificationSettings?: object;
}

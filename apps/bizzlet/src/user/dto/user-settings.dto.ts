import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserSettingsDto {
  @ApiPropertyOptional({ default: null })
  @IsString()
  @Expose()
  defaultCurrency?: string;
}

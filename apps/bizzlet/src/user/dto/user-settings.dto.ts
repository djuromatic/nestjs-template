import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserSettingsDto {
  @Expose()
  @IsString()
  defaultCurrency: string;
}

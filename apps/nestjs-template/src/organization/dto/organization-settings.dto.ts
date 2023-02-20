import { Expose } from 'class-transformer';
import { IsJSON, IsString } from 'class-validator';

export class OrganizationSettingsDto {
  @Expose()
  @IsString()
  defaultCurrency: string;

  @IsJSON()
  @Expose()
  notificationSettings: string;
}

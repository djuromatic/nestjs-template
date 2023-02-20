import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class OrganizationSettingsDto {
  @IsString()
  @Expose()
  defaultCurrency?: string;

  @Expose()
  notificationSettings?: Object;
}

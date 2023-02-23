import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class OrganizationProfileDto {
  @IsString()
  @Expose()
  location?: string;
}

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrganizationContactDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  invoice: string;
}

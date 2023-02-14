import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'libs/database/adapter';

export class OrganizationDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

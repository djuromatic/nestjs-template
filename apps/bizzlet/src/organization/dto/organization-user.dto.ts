import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'libs/modules/database/adapter';

export class OrganizationUserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  role: string;
}

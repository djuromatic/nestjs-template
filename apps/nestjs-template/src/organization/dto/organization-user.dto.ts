import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'libs/database/adapter';

export class OrganizationUserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @IsIn(['ADMIN', 'MEMBER'])
  role: string;
}

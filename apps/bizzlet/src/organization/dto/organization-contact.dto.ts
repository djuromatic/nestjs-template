import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrganizationContactDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  invoice: string;
}

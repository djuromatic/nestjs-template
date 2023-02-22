import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class OrganizationProfileDto {
  @ApiProperty()
  @IsString()
  @Expose()
  location?: string;
}

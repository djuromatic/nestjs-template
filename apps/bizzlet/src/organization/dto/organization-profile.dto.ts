import { Expose } from 'class-transformer';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrganizationProfileDto {
 


  @IsString()
  @Expose()
  location: string;
}

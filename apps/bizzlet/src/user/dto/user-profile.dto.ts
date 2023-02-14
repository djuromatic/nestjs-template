import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  location: string;
}

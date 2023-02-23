import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @Expose()
  firstName?: string;

  @IsString()
  @Expose()
  lastName?: string;

  @IsString()
  @Expose()
  location?: string;
}

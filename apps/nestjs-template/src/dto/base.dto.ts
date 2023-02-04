import { Expose } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

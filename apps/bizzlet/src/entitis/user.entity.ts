import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Expose()
  @Column({ name: 'first_name' })
  firstName: string;

  @Expose()
  @Column({ name: 'last_name' })
  lastName: string;

  @Expose()
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}

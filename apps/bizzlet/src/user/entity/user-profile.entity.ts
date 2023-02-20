import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'first_name', default: null })
  firstName?: string;

  @Expose()
  @Column({ name: 'last_name', default: null })
  lastName?: string;

  @Expose()
  @Column({ name: 'location', default: null })
  location?: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId?: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

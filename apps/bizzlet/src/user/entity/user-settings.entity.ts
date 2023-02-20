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

@Entity('user_settings')
export class UserSettings extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'default_currency', default: null })
  defaultCurrency?: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId?: string;

  @OneToOne(() => User, (user) => user.settings)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

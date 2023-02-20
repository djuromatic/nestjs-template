import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_notifications')
export class UserNotification extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'type', type: 'smallint' })
  type: number;

  @Expose()
  @Column({ name: 'message' })
  message: string;

  @Expose()
  @Column({ name: 'metadata', type: 'json' })
  metadata: Object;

  @Column({ name: 'user_id', type: 'uuid' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

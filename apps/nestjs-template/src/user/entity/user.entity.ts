import { Expose } from 'class-transformer';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import { UserNotification } from './user-notification.entity';
import { UserProfile } from './user-profile.entity';
import { UserSettings } from './user-settings.entity';
import { OrganizationUser } from '../../organization/entity/organization-user.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @Expose()
  @Column({ name: 'public_id', type: 'uuid', unique: true })
  publicId: string;

  @Expose()
  @Column({ name: 'email', unique: true })
  email: string;

  @Expose()
  @Column({ name: 'status', type: 'smallint', default: 0 })
  status: number;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: true,
  })
  profile?: UserProfile;

  @OneToOne(() => UserSettings, (settings) => settings.user, {
    cascade: true,
  })
  settings?: UserSettings;

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.user,
  )
  notifications?: UserNotification[];

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.user,
  )
  organizationsUsers?: OrganizationUser[];
}

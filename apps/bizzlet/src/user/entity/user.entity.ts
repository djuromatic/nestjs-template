import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  VirtualColumn,
} from 'typeorm';
import { OrganizationUser } from '../../../../bizzlet/src/organization/entity/organization-user.entity';
import { Organization } from '../../../../bizzlet/src/organization/entity/organization.entity';
import { UserNotification } from './user-notification.entity';
import { UserProfile } from './user-profile.entity';
import { UserSettings } from './user-settings.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @Expose()
  @Column({ name: 'public_id' })
  publicId: number;

  @Expose()
  @Column({ name: 'email' })
  email: string;

  @Expose()
  @Column({ name: 'status', type: 'smallint', default: 0 })
  status: number;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile?: UserProfile;

  @OneToOne(() => UserSettings, (settings) => settings.user)
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

  // @BeforeInsert()
  // emailToLowerCase?() {
  //   this.email = this.email.toLowerCase();
  // }
}

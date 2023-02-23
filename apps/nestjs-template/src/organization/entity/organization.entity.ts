import { Entity, OneToOne, OneToMany, Column } from 'typeorm';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import { OrganizationContact } from './organization-contact.entity';
import { OrganizationProfile } from './organization-profile.entity';
import { OrganizationSettings } from './organization-settings.entity';
import { OrganizationUser } from './organization-user.entity';
import { Expose } from 'class-transformer';

@Entity('organizations')
export class Organization extends CustomBaseEntity {
  @Expose()
  @Column({ name: 'name' })
  name?: string;

  @OneToOne(() => OrganizationProfile, (profile) => profile.organization, {
    cascade: true,
  })
  profile?: OrganizationProfile;

  @OneToOne(() => OrganizationSettings, (settings) => settings.organization, {
    cascade: true,
  })
  settings?: OrganizationSettings;

  @OneToMany(() => OrganizationContact, (contact) => contact.organization)
  contacts?: OrganizationContact[];

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.organization,
  )
  organizationsUsers?: OrganizationUser[];
}

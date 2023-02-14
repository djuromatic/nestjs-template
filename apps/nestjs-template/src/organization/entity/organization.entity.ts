import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/database/adapter';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { OrganizationContact } from './organization-contact.entity';
import { OrganizationProfile } from './organization-profile.entity';
import { OrganizationSettings } from './organization-settings.entity';
import { OrganizationUser } from './organization-user.entity';

@Entity('organizations')
export class Organization extends CustomBaseEntity {
  @Expose()
  @Column({ name: 'name' })
  name: string;

  @OneToOne(() => OrganizationProfile, (profile) => profile.organization)
  profile?: OrganizationProfile;

  @OneToOne(() => OrganizationSettings, (settings) => settings.organization)
  settings?: OrganizationSettings;

  @OneToMany(() => OrganizationContact, (contact) => contact.organization)
  contacts?: OrganizationContact[];

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.organization,
  )
  organizationsUsers?: OrganizationUser[];
}

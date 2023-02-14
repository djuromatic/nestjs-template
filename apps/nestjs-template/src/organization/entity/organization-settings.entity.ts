import { Expose } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_settings')
export class OrganizationSettings {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'default_currency' })
  defaultCurrency: string;

  @Expose()
  @Column({ name: 'notification_settings', type: 'json' })
  notificationSettings: string;

  @OneToOne(() => Organization, (organization) => organization.settings)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}

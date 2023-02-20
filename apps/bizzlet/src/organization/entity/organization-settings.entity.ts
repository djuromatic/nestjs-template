import { Expose } from 'class-transformer';
import { CustomBaseEntity } from 'libs/modules/database/adapter';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity('organization_settings')
export class OrganizationSettings extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose()
  @Column({ name: 'default_currency', default: null })
  defaultCurrency?: string;

  @Expose()
  @Column({ name: 'notification_settings', type: 'json', default: null })
  notificationSettings?: Object;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId?: string;

  @OneToOne(() => Organization, (organization) => organization.settings)
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;
}

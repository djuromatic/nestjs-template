import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Organization } from './organization.entity';

@Entity('organizations_users')
export class OrganizationUser {
  @Expose()
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Expose()
  @PrimaryColumn({ name: 'organization_id' })
  organizationId: string;

  @ManyToOne(() => User, (user) => user.organizationsUsers)
  @JoinColumn([{ name: 'user_id' }])
  user: User;

  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationsUsers,
  )
  @JoinColumn([{ name: 'organization_id' }])
  organization: Organization;

  @Expose()
  @Column({ name: 'role' })
  role: string;
}

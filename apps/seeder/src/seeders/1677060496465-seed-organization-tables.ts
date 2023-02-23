import * as fs from 'fs';
import { HelperService } from 'libs/utils/helpers';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { organizationData } from './generators';

const seedDataPath = __dirname + '/seeded_data/organizations.json';

export class seedOrganizationTables1677060496465 implements MigrationInterface {
  name = 'seedOrganizationTables1677060496465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'organizations',
        Object.keys(organizationData.organizations[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(organizationData.organizations)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'organization_profiles',
        Object.keys(organizationData.profiles[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(organizationData.profiles)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'organization_settings',
        Object.keys(organizationData.settings[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(organizationData.settings)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'organization_contacts',
        Object.keys(organizationData.contacts[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(organizationData.contacts)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'organizations_users',
        Object.keys(organizationData.users[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(organizationData.users)
      .returning('id')
      .execute();

    if (fs.existsSync(seedDataPath)) {
      fs.unlinkSync(seedDataPath);
    }
    fs.writeFileSync(seedDataPath, JSON.stringify(organizationData, null, 2), {
      encoding: 'utf8',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('organizations_users')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('organization_contacts')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('organization_settings')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('organization_profiles')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('organizations')
      .execute();

    if (fs.existsSync(seedDataPath)) {
      fs.unlinkSync(seedDataPath);
    }
  }
}

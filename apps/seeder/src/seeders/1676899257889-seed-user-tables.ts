import * as fs from 'fs';

import { MigrationInterface, QueryRunner } from 'typeorm';
import { userData } from './generators';
import { HelperService } from 'libs/utils/helpers';

const seedDataPath = __dirname + '/seeded_data/users.json';

export class seedUserTables1676899257889 implements MigrationInterface {
  name = 'seedUserTables1676899257889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'users',
        Object.keys(userData.users[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(userData.users)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'user_profiles',
        Object.keys(userData.profiles[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(userData.profiles)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'user_settings',
        Object.keys(userData.settings[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(userData.settings)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'user_notifications',
        Object.keys(userData.notifications[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(userData.notifications)
      .returning('id')
      .execute();

    if (fs.existsSync(seedDataPath)) {
      fs.unlinkSync(seedDataPath);
    }
    fs.writeFileSync(seedDataPath, JSON.stringify(userData, null, 2), {
      encoding: 'utf8',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user_notifications')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user_settings')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user_profiles')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .execute();

    if (fs.existsSync(seedDataPath)) {
      fs.unlinkSync(seedDataPath);
    }
  }
}

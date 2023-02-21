import { MigrationInterface, QueryRunner } from 'typeorm';
import { users, profiles } from '../seeds/users.seed';
import { HelperService } from 'libs/utils/helpers';

export class seedUserTables1676899257889 implements MigrationInterface {
  name = 'seedUserTables1676899257889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(users);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'users',
        Object.keys(users[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(users)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(
        'user_profiles',
        Object.keys(profiles[0]).map((key) =>
          HelperService.camelCaseToSnakeCase(key),
        ),
      )
      .values(profiles)
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('user_profiles')
      .execute();
  }
}

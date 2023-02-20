import { MigrationInterface, QueryRunner } from "typeorm"
import { users } from '../seeds/users.seed';

export class seedUsersTable1676899257889 implements MigrationInterface {
    name = "seedUsersTable1676899257889";
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(users);
        
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('users', Object.keys(users[0]))
            .values(users)
            .returning('id')
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('users')
            .execute();
    }

}

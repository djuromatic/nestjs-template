import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsersTable1676899243160 implements MigrationInterface {
    name = "createUsersTable1676899243160";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY
                , "first_name" varchar(255)
                , "last_name" varchar(255)
                , "is_active" boolean
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}

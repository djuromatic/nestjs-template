import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTables1676899243160 implements MigrationInterface {
  name = 'createUserTables1676899243160';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  
        
      CREATE TABLE "users" (
        "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()
        , "public_id" bigint NOT NULL
        , "email" varchar(255) NOT NULL
        , "status" smallint NOT NULL
        , "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
        , "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`,
    );

    await queryRunner.query(
      `CREATE TABLE "user_profiles" (
        "id" UUID NOT NULL 
        , "first_name" varchar(50)
        , "last_name" varchar(50)
        , "location" varchar(255)
        , FOREIGN KEY("id") REFERENCES "users"("id")
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_profiles"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

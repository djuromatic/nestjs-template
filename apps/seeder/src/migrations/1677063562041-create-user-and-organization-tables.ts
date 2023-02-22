import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserAndOrganizationTables1677063562041
  implements MigrationInterface
{
  name = 'createUserAndOrganizationTables1677063562041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "invoice" character varying NOT NULL, "organization_id" uuid NOT NULL, CONSTRAINT "PK_3728fac56883cb199cd707037a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "location" character varying NOT NULL, "organization_id" uuid NOT NULL, CONSTRAINT "REL_4b15935f94a583414e9049a228" UNIQUE ("organization_id"), CONSTRAINT "PK_db74d09512f13d2218cebd8e1eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" smallint NOT NULL, "message" character varying NOT NULL, "metadata" json NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_569622b0fd6e6ab3661de985a2b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "location" character varying, "user_id" uuid NOT NULL, CONSTRAINT "REL_6ca9503d77ae39b4b5a6cc3ba8" UNIQUE ("user_id"), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "default_currency" character varying, "user_id" uuid NOT NULL, CONSTRAINT "REL_4ed056b9344e6f7d8d46ec4b30" UNIQUE ("user_id"), CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL, "email" character varying NOT NULL, "status" smallint NOT NULL DEFAULT '0', CONSTRAINT "UQ_848b8b23bf0748243d4e1e76ae3" UNIQUE ("public_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "organization_id" uuid NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_003d8b55ed4aba4f45c8752e1c5" PRIMARY KEY ("id", "user_id", "organization_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "default_currency" character varying, "notification_settings" json, "organization_id" uuid NOT NULL, CONSTRAINT "REL_5fbdacce9bdcb454877d068e35" UNIQUE ("organization_id"), CONSTRAINT "PK_67a83a1c6256f927137c33ddd7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" ADD CONSTRAINT "FK_59580ba4b6cf1bcab8ebc6b7aa3" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_profiles" ADD CONSTRAINT "FK_4b15935f94a583414e9049a2283" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notifications" ADD CONSTRAINT "FK_ae9b1d1f1fe780ef8e3e7d0c0f6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_2988713747e3b69e9522901f267" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_e0e76d9c419e1d6c6608fc481b6" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_settings" ADD CONSTRAINT "FK_5fbdacce9bdcb454877d068e355" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_settings" DROP CONSTRAINT "FK_5fbdacce9bdcb454877d068e355"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_e0e76d9c419e1d6c6608fc481b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_2988713747e3b69e9522901f267"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notifications" DROP CONSTRAINT "FK_ae9b1d1f1fe780ef8e3e7d0c0f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_profiles" DROP CONSTRAINT "FK_4b15935f94a583414e9049a2283"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contacts" DROP CONSTRAINT "FK_59580ba4b6cf1bcab8ebc6b7aa3"`,
    );
    await queryRunner.query(`DROP TABLE "organization_settings"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "organizations_users"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_settings"`);
    await queryRunner.query(`DROP TABLE "user_profiles"`);
    await queryRunner.query(`DROP TABLE "user_notifications"`);
    await queryRunner.query(`DROP TABLE "organization_profiles"`);
    await queryRunner.query(`DROP TABLE "organization_contacts"`);
  }
}

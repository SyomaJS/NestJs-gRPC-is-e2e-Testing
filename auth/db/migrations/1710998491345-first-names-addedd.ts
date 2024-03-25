import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstNamesAddedd1710998491345 implements MigrationInterface {
    name = 'FirstNamesAddedd1710998491345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "login" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."user_courses_courses" ("userId" integer NOT NULL, "coursesId" integer NOT NULL, CONSTRAINT "PK_86c942cab1d66e7878a5a005fd2" PRIMARY KEY ("userId", "coursesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e01f6486bfed8aceb2c061fd34" ON "auth"."user_courses_courses" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4ad7110b5c8d8767b6f7906be" ON "auth"."user_courses_courses" ("coursesId") `);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" ADD CONSTRAINT "FK_e01f6486bfed8aceb2c061fd341" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" ADD CONSTRAINT "FK_e4ad7110b5c8d8767b6f7906be6" FOREIGN KEY ("coursesId") REFERENCES "core"."courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" DROP CONSTRAINT "FK_e4ad7110b5c8d8767b6f7906be6"`);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" DROP CONSTRAINT "FK_e01f6486bfed8aceb2c061fd341"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_e4ad7110b5c8d8767b6f7906be"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_e01f6486bfed8aceb2c061fd34"`);
        await queryRunner.query(`DROP TABLE "auth"."user_courses_courses"`);
        await queryRunner.query(`DROP TABLE "auth"."user"`);
    }

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMigration1711444405581 = void 0;
class TestMigration1711444405581 {
    constructor() {
        this.name = 'TestMigration1711444405581';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "core"."file" ("id" SERIAL NOT NULL, "fileName" character varying(255) NOT NULL, "filePath" character varying(255) NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."courses" ("id" SERIAL NOT NULL, "courseName" character varying(255) NOT NULL, "price" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "login" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."file_courses_courses" ("fileId" integer NOT NULL, "coursesId" integer NOT NULL, CONSTRAINT "PK_c2aaba61c2a90a683570eb8ef97" PRIMARY KEY ("fileId", "coursesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b3dfbf53004be9c1552df4aa2" ON "core"."file_courses_courses" ("fileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d915c6bf831dd99d200990daf" ON "core"."file_courses_courses" ("coursesId") `);
        await queryRunner.query(`CREATE TABLE "auth"."user_courses_courses" ("userId" integer NOT NULL, "coursesId" integer NOT NULL, CONSTRAINT "PK_86c942cab1d66e7878a5a005fd2" PRIMARY KEY ("userId", "coursesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e01f6486bfed8aceb2c061fd34" ON "auth"."user_courses_courses" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4ad7110b5c8d8767b6f7906be" ON "auth"."user_courses_courses" ("coursesId") `);
        await queryRunner.query(`ALTER TABLE "core"."file_courses_courses" ADD CONSTRAINT "FK_9b3dfbf53004be9c1552df4aa2d" FOREIGN KEY ("fileId") REFERENCES "core"."file"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "core"."file_courses_courses" ADD CONSTRAINT "FK_6d915c6bf831dd99d200990daf9" FOREIGN KEY ("coursesId") REFERENCES "core"."courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" ADD CONSTRAINT "FK_e01f6486bfed8aceb2c061fd341" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" ADD CONSTRAINT "FK_e4ad7110b5c8d8767b6f7906be6" FOREIGN KEY ("coursesId") REFERENCES "core"."courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" DROP CONSTRAINT "FK_e4ad7110b5c8d8767b6f7906be6"`);
        await queryRunner.query(`ALTER TABLE "auth"."user_courses_courses" DROP CONSTRAINT "FK_e01f6486bfed8aceb2c061fd341"`);
        await queryRunner.query(`ALTER TABLE "core"."file_courses_courses" DROP CONSTRAINT "FK_6d915c6bf831dd99d200990daf9"`);
        await queryRunner.query(`ALTER TABLE "core"."file_courses_courses" DROP CONSTRAINT "FK_9b3dfbf53004be9c1552df4aa2d"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_e4ad7110b5c8d8767b6f7906be"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_e01f6486bfed8aceb2c061fd34"`);
        await queryRunner.query(`DROP TABLE "auth"."user_courses_courses"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_6d915c6bf831dd99d200990daf"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_9b3dfbf53004be9c1552df4aa2"`);
        await queryRunner.query(`DROP TABLE "core"."file_courses_courses"`);
        await queryRunner.query(`DROP TABLE "auth"."user"`);
        await queryRunner.query(`DROP TABLE "core"."courses"`);
        await queryRunner.query(`DROP TABLE "core"."file"`);
    }
}
exports.TestMigration1711444405581 = TestMigration1711444405581;
//# sourceMappingURL=1711444405581-test-migration.js.map
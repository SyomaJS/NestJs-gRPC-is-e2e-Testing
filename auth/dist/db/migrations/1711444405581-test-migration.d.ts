import { MigrationInterface, QueryRunner } from "typeorm";
export declare class TestMigration1711444405581 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

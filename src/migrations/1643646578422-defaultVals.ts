import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultVals1643646578422 implements MigrationInterface {
    name = 'defaultVals1643646578422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_result" ADD "status" text NOT NULL DEFAULT 'passed'`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "name" SET DEFAULT 'N/A'`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "age" SET DEFAULT '18'`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark1" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark2" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark3" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark3" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark2" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "mark1" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "age" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_result" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_result" DROP COLUMN "status"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class IdType1643442634538 implements MigrationInterface {
    name = 'IdType1643442634538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_result" DROP CONSTRAINT "PK_45ff5b6577423d387d1a524a042"`);
        await queryRunner.query(`ALTER TABLE "student_result" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student_result" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_result" ADD CONSTRAINT "PK_45ff5b6577423d387d1a524a042" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_result" DROP CONSTRAINT "PK_45ff5b6577423d387d1a524a042"`);
        await queryRunner.query(`ALTER TABLE "student_result" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student_result" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_result" ADD CONSTRAINT "PK_45ff5b6577423d387d1a524a042" PRIMARY KEY ("id")`);
    }

}

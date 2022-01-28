import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1643393438258 implements MigrationInterface {
    name = 'initial1643393438258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_result" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "mark1" integer NOT NULL, "mark2" integer NOT NULL, "mark3" integer NOT NULL, CONSTRAINT "PK_45ff5b6577423d387d1a524a042" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student_result"`);
    }

}

import { Column, Entity, PrimaryColumn } from "typeorm";

export interface IStudentResultRow {
    id: string,
    name: string,
    age: number,
    mark1: number,
    mark2: number,
    mark3: number,
}

@Entity("student_result")
export class StudentResult implements IStudentResultRow {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false, default: "N/A" })
    name: string;

    @Column({ nullable: false, type: "int", default: 18 })
    age: number;

    @Column({ type: "int", nullable: false, default: 0 })
    mark1: number;

    @Column({ type: "int", default: 0, nullable: false })
    mark2: number;

    @Column({ type: "int", default: 0, nullable: false })
    mark3: number;

    @Column({ type: "text", enum: [ "passed", "failed" ], default: "passed", nullable: false })
    status: "passed" | "failed";
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("student_result")
export class StudentResult {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "int" })
    mark1: number;

    @Column({ type: "int" })
    mark2: number;

    @Column({ type: "int" })
    mark3: number;
}

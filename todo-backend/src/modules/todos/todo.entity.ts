import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from "./todos.dto";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        default: TodoStatus.INCOMPLETE
    })
    status: TodoStatus
}
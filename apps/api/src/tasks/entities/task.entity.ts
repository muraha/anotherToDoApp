import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { ITask } from '@todo-vectorsolv-app/api-interfaces';

@Entity()
export class Task implements ITask {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  isDone: boolean;

  @ApiProperty({ required: false })
  @Column()
  doneDate?: Date | null;
}
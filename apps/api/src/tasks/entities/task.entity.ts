import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ITask } from '@another-todo-app/api-interfaces';

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
  description: string;

  @ApiProperty()
  @Column()
  isDone: boolean;

  @ApiProperty()
  @Column()
  createDate?: Date;
  
  @ApiProperty({ required: false })
  @Column()
  doneDate?: Date;

  @ApiProperty({ required: false })
  @Column()
  remindOnDate?: Date;
}
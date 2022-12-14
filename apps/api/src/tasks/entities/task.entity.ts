import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ITask } from '@another-todo-app/api-interfaces';

@Entity()
export class Task extends BaseEntity implements ITask  {
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
  createDate: string;
  
  @ApiProperty({ required: false })
  @Column()
  doneDate: string;

  @ApiProperty({ required: false })
  @Column()
  remindOnDate: string;
}
import { ApiProperty } from "@nestjs/swagger";
import {IsAlphanumeric} from 'class-validator';

export class AddTaskDto {
  @ApiProperty()
  @IsAlphanumeric()
  title: string;

  @ApiProperty()
  isDone: boolean;

  @ApiProperty({ required: false })
  doneDate?: Date | null;
}
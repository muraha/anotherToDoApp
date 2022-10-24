import { ApiProperty } from "@nestjs/swagger";
import {IsAlphanumeric} from 'class-validator';

export class AddTaskDto {
  @ApiProperty()
  // @IsAlphanumeric()
  title: string;

  @ApiProperty()
  description: string;
  
  @ApiProperty({ required: false })
  remindOnDate?: string;

  @ApiProperty({ required: false })
  isDone?: boolean;

  @ApiProperty({ required: false })
  doneDate?: string;

  @ApiProperty({ required: false })
  createDate?: string;
}
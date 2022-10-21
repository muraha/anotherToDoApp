import { ApiProperty } from "@nestjs/swagger";
import {IsAlphanumeric} from 'class-validator';

export class AddTaskDto {
  @ApiProperty()
  @IsAlphanumeric()
  title: string;

  @ApiProperty()
  description: string;
  
  // @ApiProperty()
  // @IsDateString()
  // remindOn: Date;

  // @ApiProperty()
  // isDone: boolean;

  // @ApiProperty({ required: false })
  // doneDate?: Date | null;

  // @ApiProperty({ required: false })
  // createDate?: Date | null;
}
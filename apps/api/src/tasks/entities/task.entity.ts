import { ApiProperty } from "@nestjs/swagger";

export class Task {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty({ required: false })
  doneDate?: Date | null;
}
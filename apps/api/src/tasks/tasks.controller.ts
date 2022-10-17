import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AddTaskDto } from './dto/add-task.dto';
import { Task } from './entities/task.entity';

import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiOkResponse({type: Task, isArray: true})
  @ApiQuery({name: 'word', required: false})
  @Get('getTasks')
  getAllTasks(@Query('word') word?: string): Task[] {
    return this.tasksService.getAll(word);
  }

  @ApiOkResponse({type: Task})
  @ApiNotFoundResponse({description: 'Task is not found' })
  @Get('getTask/:id')
  getOneTaskById(@Param('id') id: string): Task {
    return this.tasksService.getOneById(id);
  }

  @ApiCreatedResponse({ type: Task })
  @ApiBadRequestResponse({ description: 'Data validation is not passed'})
  @Post('addTask')
  addNewTask(@Body() data:AddTaskDto): Task {
    return this.tasksService.addTask(data);
  }

  @Put('updateTask/:id')
  updateTask(
    @Body() data:AddTaskDto,
    @Param('id') id: string
  ): boolean {
    return this.tasksService.updTask(data, id);
  }

  @Delete('delTask/:id')
  deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.delTask(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataTasks } from '@another-todo-app/api-interfaces';

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
  getAllTasks(
    @Query('word') word?: string,
  ): Promise<DataTasks> {
    return this.tasksService.getAll(word);
  }

  @ApiOkResponse({type: Task})
  @ApiNotFoundResponse({description: 'Task is not found' })
  @Get('getTask/:id')
  getOneTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getOneById(id);
  }

  @ApiCreatedResponse({ type: Task })
  @ApiBadRequestResponse({ description: 'Data validation is not passed'})
  @Post('addTask')
  addNewTask(@Body() data:AddTaskDto): Promise<Task> {
    return this.tasksService.addTask(data);
  }

  @ApiOkResponse({type: Task})
  @Put('updateTask/:id')
  updateTask(
    @Param('id') id: number,
    @Body() data?: AddTaskDto,
  ): Promise<Task> {
    return this.tasksService.updTask(id, data);
  }

  @ApiOkResponse({type: Task})
  @Patch('toggleTaskDone/:id')
  toggleTaskDone(
    @Param('id') id: number
  ): Promise<Task> {   
    return this.tasksService.toggleTaskDone(id);
  }

  @ApiOkResponse({description: 'Successfully deleted'})
  @ApiNotFoundResponse({ description: 'The desired task was not found'})
  @Delete('delTask/:id')
  deleteTask(@Param('id') id: number): Promise<DataTasks> {
    return this.tasksService.delTask(id);
  }
}

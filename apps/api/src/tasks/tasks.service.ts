import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataTasks } from '@another-todo-app/api-interfaces';
import { Repository, Like } from 'typeorm';
import { AddTaskDto } from './dto/add-task.dto';
import { Task } from './entities/task.entity';

const notFoundError = () => {
  throw new NotFoundException({description:'Task does not exist or it was deleted'})
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>
  ) { }

  // @Get('getTasks')
  async getAll(
    word?: string,
  ): Promise<DataTasks> {
    let data: Task[]
    let total: number

    if (word) {
      [data, total] = await this.taskRepo.findAndCountBy({
        title: Like(`%${word}%`),
      })
      return { data, total }
    }

    [data, total] = await this.taskRepo.findAndCount({
      order: { id: 'DESC' }
    })
    return { data, total }
  }

  // @Get('getTask/:id')
  async getOneById(id: number): Promise<Task> {
    const task = await this.taskRepo.findOneBy({ id })
    if (!task) notFoundError()
    return task
  }

  // @Post('addTask') 
  async addTask(addTaskDto: AddTaskDto): Promise<Task> {
    const {title, description} = addTaskDto
    const date = new Date()
    const createDate = date.toISOString()

    const task = this.taskRepo.create({
      title,
      description,
      createDate,
      isDone: false,
      doneDate: "",
      remindOnDate: "",
    })

    return await this.taskRepo.save(task)
  }

  // @Put('updateTask/:id')
  async updTask(id: number, addTaskDto: AddTaskDto): Promise<Task> {
    let doneDate = ''
    if(addTaskDto.isDone && !addTaskDto.doneDate) {
      const date = new Date()
      doneDate = date.toISOString()
    }

    await this.taskRepo.update({ id }, {
      ...addTaskDto,
      doneDate,
    })

    return await this.taskRepo.findOneBy({ id });
  }

  // @Patch('toggleTaskDone/:id')
  async toggleTaskDone(id: number): Promise<Task> {
    const date = new Date()
    const doneDate = date.toISOString()
    const { isDone } = await this.taskRepo.findOneBy({ id })
    await this.taskRepo.update(
        { id },
        { 
          isDone: !isDone,
          doneDate: isDone ? "" : doneDate,
          remindOnDate: ''
        }
      )
    return await this.taskRepo.findOneBy({ id });
  }

  // @Delete('delTask/:id')
  async delTask(id: number): Promise<DataTasks> {
    const task = await this.taskRepo.findOneBy({ id })
    if(!task) notFoundError()
    await this.taskRepo.delete({id})
    return (await this.getAll())
  }
}

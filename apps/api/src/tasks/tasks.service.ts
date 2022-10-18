import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ): Promise<{ data: Task[], total: number }> {
    let data: Task[]
    let total: number

    if (word) {
      [data, total] = await this.taskRepo.findAndCountBy({
        title: Like(`%${word}%`),
      })
      return { data, total }
    }

    [data, total] = await this.taskRepo.findAndCount({
      order: { id: 'ASC' }
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
    const task = this.taskRepo.create(addTaskDto)

    return await this.taskRepo.save(task)
  }

  // @Put('updateTask/:id')
  async updTask(id: number, addTaskDto: AddTaskDto): Promise<Task> {
    await this.taskRepo.update({ id }, addTaskDto)

    return await this.taskRepo.findOneBy({ id });
  }

  // @Put('toggleTaskDone/:id')
  async toggleTaskDone(id: number): Promise<Task> {
    const date = new Date()
    const doneDate = date.toISOString()
    const { isDone } = await this.taskRepo.findOneBy({ id })
    await this.taskRepo.update(
        { id },
        { isDone: !isDone, doneDate: isDone ? "" : doneDate }
      )
    return await this.taskRepo.findOneBy({ id });
  }

  // @Delete('delTask/:id')
  async delTask(id: number): Promise<string> {
    const task = await this.taskRepo.findOneBy({ id })
    if(!task) notFoundError()
    await this.taskRepo.delete({id})
    return 'success'
  }
}

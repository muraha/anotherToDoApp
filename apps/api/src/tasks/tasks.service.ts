import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskDto } from './dto/add-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  todos: Task[] = [{
    id: '1',
    title: 'first task',
    isDone: false,
    doneDate: null
  }, {
    id: '2',
    title: 'second task',
    isDone: false,
    doneDate: null
  }];

  uID(): string {
    return '_' + Math.random().toString(36).slice(2, 9);
  };

  // @Get('getTasks')
  getAll(word?: string): Task[] {
    if(word) {
      return this.todos.filter(t => t.title.indexOf(word) !== -1)
    }
    return this.todos
  }

  // @Get('getTask/:id')
  getOneById(id: string): Task {
    const task = this.todos.find(t => t.id === id)

    if (!task) throw new NotFoundException()
    return task
  }

  // @Post('addTask') 
  addTask(addTaskDto: AddTaskDto): Task {
    const newTask = {
      id: this.uID(),
      ...addTaskDto, 
    }
    this.todos.push(newTask);
    return newTask
  }

  // @Put('updateTask/:id')
  updTask(addTaskDto: AddTaskDto, id: string): boolean {
    const updatedList = this.todos.map(t => {
      if (t.id === id) return { ...t, ...addTaskDto };
      return t;
    })
    this.todos = updatedList
    return true
  }

  // @Delete('delTask/:id')
  delTask(id: string): boolean {
    const filteredTodo = this.todos.filter(t => t.id !== id)
    this.todos = filteredTodo
    return true
  }
}

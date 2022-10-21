import { Component, OnInit } from '@angular/core';
import { ITask, ITaskRequired } from '@another-todo-app/api-interfaces';
import { EventService } from '../event.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class MainPageComponent implements OnInit {
  shouldShowAll = false
  tasks: ITask[] = []
  tasksQty = 0
  doneQty = 0

  constructor(
    private tasksService: TasksService,
    private eventService: EventService,
  ) { 
    this.eventService.onSubmit().subscribe(data => this.addNewTask(data))
  }

  ngOnInit(): void {
    this.getAllTasks()
  }

  // sortByDone(t: ITask[]) {
  //   return t.sort((a, b) => Number(a.isDone) - Number(b.isDone))
  // }

  calcDone(t:ITask[]){
    return t.filter(t => t.isDone).length
  }

  toggleShowTasks() {
    this.shouldShowAll = !this.shouldShowAll
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe(({ data: tasks, total: qty }) => {
      this.tasks = tasks
      this.tasksQty = qty
      this.doneQty = this.calcDone(tasks)
    })
  }

  addNewTask(data:ITaskRequired) {
    this.tasksService.addTask(data).subscribe(
      () => this.getAllTasks()
    )
  }

  delTask(id: number) {
    this.tasksService.delTask(id).subscribe(({ data: tasks, total: qty }) => {
      this.tasks = tasks
      this.tasksQty = qty
      this.doneQty = this.calcDone(tasks)
    })
  }

  toggleTask(id: number) {
    this.tasksService.toggleTaskDone(id).subscribe(
      () => this.getAllTasks()
    )
  }
}

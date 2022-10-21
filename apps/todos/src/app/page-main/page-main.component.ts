import { Component, OnInit } from '@angular/core';
import { ITask, ITaskRequired } from '@another-todo-app/api-interfaces';
import { debounceTime } from 'rxjs';
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
  ) { }

  ngOnInit(): void {
    this.eventService.onSubmit().subscribe(data => this.addNewTask(data))
    this.eventService.onSearch().pipe(debounceTime(500)).subscribe(text => this.searchTasks(text))
    this.eventService.onUpdate().subscribe(data => this.updateTask(data))
    this.getAllTasks()
  }

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

  searchTasks(text: string) {
    this.tasksService.getAllTasks(text).subscribe(({ data: tasks }) => {
      this.tasks = tasks
    })
  }

  addNewTask(data:ITaskRequired) {
    this.tasksService.addTask(data).subscribe(
      () => this.getAllTasks()
      //? or manually push new task and increment qty
    )
  }

  updateTask(data:ITask) {
    this.tasksService.updTask(data.id, data).subscribe(
      () => this.getAllTasks()
      //? or manually push new task and increment qty
    )
  }

  delTask(id: number) {
    this.tasksService.delTask(id).subscribe(({ data: tasks, total: qty }) => {
      this.tasks = tasks
      this.tasksQty = qty
      this.doneQty = this.calcDone(tasks)
      // TODO update return value: should not return whole search results
    })
  }

  toggleTask(id: number) {
    this.tasksService.toggleTaskDone(id).subscribe(
      () => this.getAllTasks()
    )
  }
}

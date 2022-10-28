import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITask } from '@another-todo-app/api-interfaces';

import { BehaviorSubject, debounceTime } from 'rxjs';
import { EventService } from '../event.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  shouldShowAll = false
  tasks: ITask[] = []
  tasksQty = 0

  constructor(
    private tasksService: TasksService,
    private eventService: EventService,
  ) { }
  
  destroy$ = new BehaviorSubject<void>(undefined);
  
  async ngOnInit(): Promise<void> {
    this.eventService.onSubmit().subscribe(data => this.addNewTask(data));
    this.eventService.onUpdate().subscribe(data => this.updateTask(data))
    this.eventService.onSearch().pipe(debounceTime(500)).subscribe(text => this.searchTasks(text))
    await this.getAllTasks()
  }

  ngOnDestroy() {
    console.log('DESTROYED')
    this.destroy$.next();
  }

  toggleShowTasks() {
    this.shouldShowAll = !this.shouldShowAll
  }

  async getAllTasks() {
    const { data: tasks, total: qty } = await this.tasksService.getAllTasks()
      this.tasks = tasks
      this.tasksQty = qty      
  }

  async searchTasks(text: string) {
    const { data: tasks } = await this.tasksService.getAllTasks(text)
      this.tasks = tasks
  }

  async addNewTask(data: ITask) {
    const task = await this.tasksService.addTask(data)
    await this.getAllTasks()
    //! the tasks array update made by .push or .unshift doesn't trigger list update. this.getAllTasks() - works well
      // this.tasks.unshift(task)
      // this.tasksQty += 1    
  }

  updateTask(data: ITask) {
    const sub = this.tasksService.updTask(data.id, data).subscribe(t => {
      this.tasks = this.tasks.map(tt => {
        if (tt.id === t.id) return t
        return tt
      })

      sub.unsubscribe();
    })
  }

  toggleTask(id: number) {
    this.tasksService.toggleTaskDone(id).subscribe(() => {
      const date = new Date()
      const doneDate = date.toISOString()
      this.tasks = this.tasks.map(t => {
        if (t.id === id) {
          t.isDone = !t.isDone
          t.doneDate = t.isDone ? doneDate : '',
          t.remindOnDate = ''
        }
        return t
      })
    })
  }

  delTask(id: number) {
    this.tasksService.delTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.tasksQty -= 1
    })
  }
}

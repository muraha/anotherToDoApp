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

  ngOnInit(): void {
    this.eventService.onSubmit().subscribe(data => this.addNewTask(data));
    this.eventService.onUpdate().subscribe(data => this.updateTask(data))
    this.eventService.onSearch().pipe(debounceTime(500)).subscribe(text => this.searchTasks(text))
    this.getAllTasks()
  }

  ngOnDestroy() {
    console.log('DESTROYED')
    this.destroy$.next();
  }

  toggleShowTasks() {
    this.shouldShowAll = !this.shouldShowAll
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe(({ data: tasks, total: qty }) => {
      this.tasks = tasks
      this.tasksQty = qty
    })
  }

  searchTasks(text: string) {
    this.tasksService.getAllTasks(text).subscribe(({ data: tasks }) => {
      this.tasks = tasks
    })
  }

  addNewTask(data: ITask) {
    this.tasksService.addTask(data).subscribe(t => {
      this.tasks.push(t)
      this.tasks = this.tasks.sort((a, b) => b.id - a.id)
      this.tasksQty += 1
    })
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

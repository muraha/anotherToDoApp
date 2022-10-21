import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from '@another-todo-app/api-interfaces';
import { EventService } from '../event.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  id = 0
  title = ''
  description = ''
  remindOnDate = ''
  isDone!: boolean
  doneDate = ''
  createDate = ''

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    //TODO: update to remove unnecessary reload and data population.
    //! on init load I do not have task data
    const url = this.router.url
    this.id = Number(url.split('/')[2])

    this.tasksService.getTaskById(this.id).subscribe((t) => {
      if (t.createDate) {
        const date = new Date(t.createDate)
        t.createDate = date.toDateString()
      }
      if (t.doneDate) {
        const date = new Date(t.doneDate)
        t.doneDate = date.toDateString()
      }

      this.id = t.id
      this.title = t.title
      this.description = t.description
      this.createDate = t.createDate
      this.isDone = t.isDone
      this.doneDate = t.doneDate
      this.remindOnDate = t.remindOnDate
    })
  }

  updateTask() {
    const updatedTask = {
      id: this.id,
      title: this.title,
      description: this.description,
      isDone: this.isDone,
      remindOnDate: !this.isDone ? this.remindOnDate : '',
    }
    this.eventService.updateTask(updatedTask)
  }

}

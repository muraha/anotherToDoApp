import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from '@another-todo-app/api-interfaces';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  task: ITask = {
    title: "",
    description: "",
    id: 0,
  }
  id!: number

  constructor(
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    //TODO: update to remove unnecessary reload and data population.
    //! on init load I do not have task data
    const url = this.router.url
    this.id = Number(url.split('/')[2])

    this.tasksService.getTaskById(this.id).subscribe((t) => this.task = t)
  }
}

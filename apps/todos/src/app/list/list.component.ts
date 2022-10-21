import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ITask } from '@another-todo-app/api-interfaces';

@Component({
  selector: 'todo-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() tasks: ITask[] = [];
  @Input() shouldShowAll = false;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<number>();

  constructor(
    private router: Router
  ) {''}

  ngOnInit(): void {''}

// TODO: add EventTarget type here and somehow consume dataset
  handleTaskDelete(e:any) { 
    this.deleteEvent.emit(e.id)
  }

  handleTaskToggle(e:any) {
    this.toggleEvent.emit(e.id)
  }

  handleOpenDetails(e:any) {
    this.router.navigate([`task/${e.id}`])
  }
}

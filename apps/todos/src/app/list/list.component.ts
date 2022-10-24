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
    this.deleteEvent.emit(Number(e.id))
  }

  handleTaskToggle(e:any) {
    this.toggleEvent.emit(Number(e.id))
  }

  handleOpenDetails({target, data}: {target:any, data: number}) {
    console.dir(target, data)
    this.router.navigate([`task/${data}`])
  }
}

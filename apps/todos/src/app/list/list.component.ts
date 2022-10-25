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
  columnsToDisplay = ['isDone', 'title', 'id'];

  constructor(
    private router: Router
  ) {''}

  ngOnInit(): void {''}

// TODO: add EventTarget type here and somehow consume dataset
  handleTaskDelete(et:any) { 
    this.deleteEvent.emit(Number(et.id))
  }

  handleTaskToggle(et:any) {
    this.toggleEvent.emit(Number(et.id))
  }

  handleOpenDetails({target, data}: {target:any, data: number}) {
    this.router.navigate([ {outlets: {dialog: ['task', data]}} ])
  }
}

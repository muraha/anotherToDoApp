import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '@another-todo-app/api-interfaces';

@Component({
  selector: 'todo-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() tasks: ITask[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<number>();

  constructor() {''}

  ngOnInit(): void {''}

  handleTaskDelete(e:any) { // TODO: add EventTarget type here and somehow consume dataset
    this.deleteEvent.emit(e.id)
  }

  handleTaskToggle(e:any) {
    this.toggleEvent.emit(e.id)
  }
}

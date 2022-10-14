import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsoleLogger } from '@nestjs/common';
import { Todo } from '@todo-vectorsolv-app/api-interfaces';

@Component({
  selector: 'todo-vectorsolv-app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Output() delHandler: EventEmitter<string> = new EventEmitter();

  constructor() {''}

  ngOnInit(): void {''}

  handleDelete(id: string) {
    console.log('fe', id)
    this.delHandler.emit(id)
  }
}

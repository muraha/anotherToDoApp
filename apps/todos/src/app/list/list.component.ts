import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { ITask } from '@another-todo-app/api-interfaces';
import { ItemDialogComponent } from '../dialog/item/item.component';

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
    public dialog: MatDialog,
    private router: Router,
  ) {''}

  ngOnInit(): void {''}

// TODO: add EventTarget type here and somehow consume dataset
  handleTaskDelete(et:any) { 
    this.deleteEvent.emit(Number(et.id))
  }

  handleTaskToggle(et:any) {
    this.toggleEvent.emit(Number(et.id))
  }

  handleOpenDetails(id: number) {
    this.router.navigate([ {outlets: {dialog: ['task', id]}} ])
  }

  dialogOpen(id: number) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      minWidth: '50vw',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'), result;
    });
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../dialog/add/add.component';
import { EventService } from '../event.service';

@Component({
  selector: 'todo-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() search = '';
  @Input() headerName = '';
  @Output() addHandler: EventEmitter<string> = new EventEmitter();

  constructor(
    private eventService: EventService,
    public dialog: MatDialog
  ) {''}
  ngOnInit(): void {''}

  handleAdd () {
    this.addHandler.emit('TestTask')
  }

  handleSearch() {
    this.eventService.searchTask(this.search)
  }

  clearInput() {
    this.search = ''
    this.eventService.searchTask(this.search)
  }

  dialogOpen() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '250px',
      height: '300px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'), result;
      // this.animal = result;
    });
  }

}

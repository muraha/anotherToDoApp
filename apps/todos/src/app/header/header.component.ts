import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
    private eventService: EventService
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

}

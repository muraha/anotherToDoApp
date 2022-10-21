import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventService } from '../event.service';
import { TasksService } from '../tasks.service';


// const debounce = (fn: any, wait: number) => {
//   let timeout:NodeJS.Timeout
  
//   return (...args: any) => {
//     const later = () => {
//       clearTimeout(timeout);
//       fn(...args);
//     }
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   }
// }

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
    private tasksService: TasksService,
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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName!: string;
  @Input() total!: number;
  @Output() addHandler: EventEmitter<string> = new EventEmitter();

  constructor() {''}
  ngOnInit(): void {''}

  handleAdd () {
    this.addHandler.emit('TestTask')
  }
}

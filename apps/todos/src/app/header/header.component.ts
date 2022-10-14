import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-vectorsolv-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName!: string;
  @Output() addHandler: EventEmitter<void> = new EventEmitter();

  constructor() {''}
  ngOnInit(): void {''}

  handleAdd () {
    this.addHandler.emit()
  }
}

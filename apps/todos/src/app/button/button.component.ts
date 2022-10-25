import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() redirectTo: object|string = '';
  @Input() secondary = false;
  @Input() className = ''
  @Output() btnClick = new EventEmitter<MouseEvent | KeyboardEvent>();

  constructor(
    private router: Router
  ) {''}
  ngOnInit(): void {''}

  handleClick(e: MouseEvent | KeyboardEvent) {
    this.btnClick.emit(e)
    this.redirectTo && this.router.navigate([this.redirectTo]) 
  }
}

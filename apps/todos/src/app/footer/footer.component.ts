import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'todo-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() taskQty!:number
  @Input() doneQty!:number

  constructor() {''}

  ngOnInit(): void {''}
}

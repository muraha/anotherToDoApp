import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'todo-app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<{title:string}>();
  title = '';
  description = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {''}

  onSubmit(){
    if(!this.title){
      alert('Please add a task title')
      return
    }

    const newTask = {
      title: this.title,
      description: this.description,
    }
 
    this.eventService.submitForm(newTask)
    
    this.title = ''
    this.description = ''
    this.router.navigate(['/home'])
  }

  ngOnInit(): void {''}
}

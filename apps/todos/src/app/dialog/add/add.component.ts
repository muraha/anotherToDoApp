import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'todo-app-add-dialog',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  title = '';
  description = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit(): void { '' }

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
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

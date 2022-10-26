import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../event.service';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'todo-app-item-dialog',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemDialogComponent implements OnInit {
  id = 0
  title = ''
  description = ''
  remindOnDate = ''
  isDone!: boolean
  doneDate = ''
  createDate = ''

  constructor(
    private eventService: EventService,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
  ) {}

  ngOnInit(): void {
    //TODO: update to remove unnecessary reload and data population.
    //! on init load I do not have task data
    this.id = this.data.id

    this.tasksService.getTaskById(this.id).subscribe((t) => {
      if (t.createDate) {
        const date = new Date(t.createDate)
        t.createDate = date.toDateString()
      }
      if (t.doneDate) {
        const date = new Date(t.doneDate)
        t.doneDate = date.toDateString()
      }

      this.title = t.title
      this.description = t.description
      this.createDate = t.createDate
      this.isDone = t.isDone
      this.doneDate = t.doneDate
      this.remindOnDate = t.remindOnDate
    })
  }
   updateTask() {
    const updatedTask = {
      id: this.id,
      title: this.title,
      description: this.description,
      isDone: this.isDone,
      remindOnDate: !this.isDone ? this.remindOnDate : '',
    }
    this.eventService.updateTask(updatedTask)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { ITask } from '@another-todo-app/api-interfaces';
import { EventService } from '../event.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks: ITask[] = []
  tasksQty = 0
  doneQty = 0

  constructor(
    private taskApi: TasksService,
    private eventService: EventService,
  ) { 
        this.eventService.onSubmit().subscribe((d) => this.addNewTask(d))
  }

  ngOnInit(): void {
    this.getAllTasks()
    // this.eventService.on('task submitted', this.getAllTasks())
  }

  

  sortByDone(t: ITask[]) {
    return t.sort((a, b) => Number(a.isDone) - Number(b.isDone))
  }

  calcDone(t:ITask[]){
    return t.filter(t => t.isDone).length
  }

  getAllTasks() {
    this.taskApi.getAllTasks().subscribe(data => {
      const { data: tasks, total: qty } = data
      this.tasks = this.sortByDone(tasks)
      this.tasksQty = qty
      this.doneQty = this.calcDone(tasks)
    })
  }

  addNewTask(data:{title:string}) {
    this.taskApi.addTask(data).subscribe(
      () => this.getAllTasks()
    )
  }

  delTask(id: number) {
    this.taskApi.delTask(id).subscribe(({ data, total }) => {
      this.tasks = this.sortByDone(data)
      this.tasksQty = total
      this.doneQty = this.calcDone(data)
    })
  }

  toggleTask(id: number) {
    this.taskApi.toggleTaskDone(id).subscribe(
      () => this.getAllTasks()
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { ITask } from '@todo-vectorsolv-app/api-interfaces';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'todo-app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks: ITask[] = []
  tasksQty = 0

  constructor(private taskApi: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    this.taskApi.getAllTasks().subscribe(data => {
      const {data:tasks, total:qty} = data
      this.tasks = tasks
      this.tasksQty = qty
    })
  }

  addNewTask(title:string){
    this.taskApi.addTask(title).subscribe(() => this.getAllTasks())
  }

  delTask(id:number){
    this.taskApi.delTask(id).subscribe(({data, total}) => {
      this.tasks = data
      this.tasksQty = total
    })
  }

  toggleTask(id:number){
    console.log("🚀 ~ file: page-main.component.ts ~ line 40 ~ TodosListPageComponent ~ toggleTask ~ id", id)
    this.taskApi.toggleTaskDone(id)
  }
}

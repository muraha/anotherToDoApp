import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTasks, ITask } from '@another-todo-app/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(word: string ='') {
    return this.http.get<DataTasks>(
      `/api/tasks/getTasks${word ? '?word='+word : ''}`
    )
  }

  getTaskById(id:number) {
    return this.http.get<ITask>(`/api/tasks/getTask/${id}`)
  }

  addTask(title:string) {
    return this.http.post<ITask>('/api/tasks/addTask', {title})
  }

  updTask(id:number, title:string) {
    return this.http.put<ITask>(`/api/tasks/updateTask/${id}`, {title})
  }

  toggleTaskDone(id:number) {
    return this.http.patch<ITask>(`/api/tasks/toggleTaskDone/${id}`, null)
  }

  delTask(id:number) {
    return this.http.delete<DataTasks>(`/api/tasks/delTask/${id}`)
  }
}

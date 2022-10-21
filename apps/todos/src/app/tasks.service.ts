import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTasks, ITask, ITaskRequired } from '@another-todo-app/api-interfaces';

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

  addTask(data: ITaskRequired) {
    return this.http.post<ITask>('/api/tasks/addTask', data)
  }

  updTask(id:number, data: ITaskRequired) {
    return this.http.put<ITask>(`/api/tasks/updateTask/${id}`, data)
  }

  toggleTaskDone(id:number) {
    return this.http.patch<ITask>(`/api/tasks/toggleTaskDone/${id}`, null)
  }

  delTask(id:number) {
    return this.http.delete<DataTasks>(`/api/tasks/delTask/${id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTasks, ITask, ITaskRequired } from '@another-todo-app/api-interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  async getAllTasks(word: string =''): Promise<DataTasks> {
    return await firstValueFrom(this.http.get<DataTasks>(`/api/tasks/getTasks${word ? '?word='+word : ''}`))
  }

  getTaskById(id:number) {
    return this.http.get<ITask>(`/api/tasks/getTask/${id}`)
  }

  async addTask(data: ITaskRequired) {
    return await firstValueFrom(this.http.post<ITask>('/api/tasks/addTask', data))
  }

  updTask(id:number, data: ITaskRequired) {
    return this.http.put<ITask>(`/api/tasks/updateTask/${id}`, data);
  }

  toggleTaskDone(id:number) {
    return this.http.patch<ITask>(`/api/tasks/toggleTaskDone/${id}`, null)
  }

  delTask(id:number) {
    return this.http.delete<DataTasks>(`/api/tasks/delTask/${id}`)
  }
}

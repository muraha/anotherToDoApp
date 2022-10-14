import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '@todo-vectorsolv-app/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/todo/getTodos').subscribe((t) => (this.todos = t));
  }

  getTodos(): Todo[] {
    return this.todos
  }

  addTodo(): void {
    this.http.post('/api/todo/addTodo', {}).subscribe(() => {
      this.fetch();
    });
  }

  delTodo(id: string): void {
    this.http.delete(`/api/todo/delTodo/${id}`).subscribe(() => {
      this.fetch();
    })
  }
}

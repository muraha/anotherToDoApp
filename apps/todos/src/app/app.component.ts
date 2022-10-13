import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@todo-vectorsolv-app/api-interfaces';

@Component({
  selector: 'todo-vectorsolv-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/getTodos').subscribe((t) => (this.todos = t));
  }

  addTodo() {
    this.http.post('/api/addTodo', {}).subscribe(() => {
      this.fetch();
    });
  }
}

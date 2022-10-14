import { Injectable } from '@nestjs/common';
import { Todo } from '@todo-vectorsolv-app/api-interfaces';

@Injectable()
export class AppService {
  todos: Todo[] = [];

  uID() {
    return '_' + Math.random().toString(36).slice(2, 9);
  };

  getData(): Todo[] { 
    return this.todos;
  }

  addTodo() {
    this.todos.push({
      id: this.uID(),
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    });
  }

  delTodo(id:string) {
    const filteredTodo = this.todos.filter(t => t.id !== id)
    this.todos = filteredTodo
  }
}

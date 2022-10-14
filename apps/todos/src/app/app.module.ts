import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { TodoListComponent } from './todo-list/todo-list.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'home', component: TodoListComponent },
  {
    path: 'item',
    loadComponent: () => import('./todo-item/todo-item.component').then(c => c.TodoItemComponent),
    outlet: 'item',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { TodoListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './page-main/page-main.component';
import { FooterComponent } from './footer/footer.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: 'home', component: TodoListComponent },
  {
    path: 'item',
    loadComponent: () =>
      import('./item/item.component').then((c) => c.ItemComponent),
    outlet: 'item',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TodoListComponent,
    HeaderComponent,
    FooterComponent,
    ItemComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

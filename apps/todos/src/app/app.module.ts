import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { TodoListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './page-main/page-main.component';
import { FooterComponent } from './footer/footer.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ButtonModule } from './button/button.module';
import { ItemComponent } from './item/item.component';
import { AddComponent } from './dialog/add/add.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'add', component: AddTaskComponent, outlet: 'dialog' },
  { path: 'task/:id', component: ItemComponent, outlet: 'dialog' },
  // {
  //   path: 'task/:id',
  //   outlet:'dialog',
  //   loadComponent: () => import('./item/item.module').then(m => m.ItemModule),
  // },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TodoListComponent,
    HeaderComponent,
    FooterComponent,
    AddTaskComponent,
    ItemComponent,
    AddComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatTableModule,
    MatDialogModule,
    ButtonModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

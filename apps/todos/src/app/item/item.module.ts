import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../button/button.module';


const routes: Routes = [
  { path: '', component: ItemComponent }
];

@NgModule({
  declarations: [
    // ItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ButtonModule,
  ],
  exports: [RouterModule]
})
export class ItemModule { }

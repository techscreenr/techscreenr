import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { RouterModule, Routes } from '@angular/router';

const startRoute: Routes = [
  {
    path: '',
    component: StartComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(startRoute)
  ],
  declarations: [StartComponent],
  exports: [
    RouterModule
  ]
})
export class StartModule { }

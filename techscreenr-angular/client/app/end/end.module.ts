import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndComponent } from './end.component';
import { RouterModule, Routes } from '@angular/router';

const endRoute: Routes = [
  {
    path: '',
    component: EndComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(endRoute)
  ],
  declarations: [EndComponent],
  exports: [
    RouterModule
  ]
})
export class EndModule { }

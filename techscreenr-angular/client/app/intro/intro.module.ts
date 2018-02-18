import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro.component';
import { RouterModule, Routes } from '@angular/router';

const introRoute: Routes = [
  {
    path: '',
    component: IntroComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(introRoute)
  ],
  declarations: [IntroComponent],
  exports: [
    RouterModule
  ]
})
export class IntroModule { }

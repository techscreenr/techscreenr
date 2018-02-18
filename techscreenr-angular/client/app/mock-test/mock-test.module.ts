import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockTestComponent } from './mock-test.component';
import { RouterModule, Routes } from '@angular/router';

const mockTestRoute: Routes = [
  {
    path: '',
    component: MockTestComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mockTestRoute)
  ],
  declarations: [MockTestComponent],
  exports: [
    RouterModule
  ]
})
export class MockTestModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionSidebarComponent } from './sidebar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        QuestionSidebarComponent
    ],
    exports: [
        QuestionSidebarComponent
    ]
})
export class QuestionSidebarModule { }

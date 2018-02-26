import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsComponent } from './questions.component';
import { QuestionModule } from './question/question.module';
import { QuestionSidebarModule } from './sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        QuestionModule,
        QuestionSidebarModule
    ],
    declarations: [
        QuestionsComponent
    ],
    exports: [
        QuestionsComponent
    ]
})
export class QuestionsModule { }

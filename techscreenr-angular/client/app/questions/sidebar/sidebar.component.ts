import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question, Answer } from '../../../../models';

@Component({
  selector: 'app-question-sidebar',
  templateUrl: './sidebar.component.html'
})
export class QuestionSidebarComponent {
    @Input('questions') questions: Question[];
    @Output('setActiveQuestion') setActiveQuestion: EventEmitter<Question> = new EventEmitter();
    constructor() { }

    onSetActiveQuestion(question: Question) {
        this.setActiveQuestion.emit(question);
    }
}

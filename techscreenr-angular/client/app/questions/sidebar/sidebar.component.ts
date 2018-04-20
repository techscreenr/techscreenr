import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question, Answer } from '../../../../models';

@Component({
  selector: 'app-question-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class QuestionSidebarComponent {
    @Input() questions: Question[];
    @Input() activeQuestion: Question;
    @Output() setActiveQuestion: EventEmitter<Question> = new EventEmitter();
    constructor() { }

    onSetActiveQuestion(question: Question) {
        this.setActiveQuestion.emit(question);
    }

    getQuestionClass(question: Question) {
        return question.title === this.activeQuestion.title
            ? 'button-link-active'
            : question.visited
                ? 'button-link-visited'
                : 'button-link';
    }
}

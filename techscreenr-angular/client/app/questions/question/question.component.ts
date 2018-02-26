import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question, Answer } from '../../../../models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent {
    @Input('activeQuestion') activeQuestion: Question;
    @Output('answer') answer: EventEmitter<Answer> = new EventEmitter();
    constructor() { }

    onAnswer(answer: Answer) {
        this.answer.emit(answer);
    }
}

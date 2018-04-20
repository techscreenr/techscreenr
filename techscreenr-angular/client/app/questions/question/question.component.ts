import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Question, Answer, QuestionTypeEnum } from '../../../../models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
    @Input() activeQuestion: Question;
    @Output() answer: EventEmitter<Answer> = new EventEmitter();
    @Output() updateAnswer?: EventEmitter<Answer> = new EventEmitter();
    type = QuestionTypeEnum;
    constructor() { }

    onAnswer() {
        this.answer.emit(this.activeQuestion.answers.reduce(
            (selectedAnswer, answer) => selectedAnswer ? selectedAnswer : answer.isSelected ? answer : null,
            null
        ));
    }

    onUpdateAnswer(answer: Answer) {
        this.updateAnswer.emit(answer);
    }

    setUpQuestion(type: QuestionTypeEnum) {
        return this.activeQuestion.type === type;
    }

    get hasAnsweredQuestion() {
        return !this.activeQuestion.answers.reduce(
            (hasAnswered, answer) => hasAnswered ? hasAnswered : answer.isSelected, false
        );
    }
}

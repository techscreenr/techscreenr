import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import * as fromActions from '../store/actions/question-actions';
import { Observable } from 'rxjs/Observable';
import { Answer, Question } from '../../../models';
import * as fromSelectors from '../store/selectors/questions.selectors';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
    activeQuestion$: Observable<Question>;
    questions$: Observable<Question[]>;
    constructor(protected store: Store<State>) { }

    ngOnInit() {
        this.store.dispatch(new fromActions.GetQuestionsRequestAction());
        this.questions$ = this.store.select(fromSelectors.getQuestions);
        this.activeQuestion$ = this.store.select(fromSelectors.getActiveQuestion);
    }

    setActiveQuestion(question: Question) {
        this.store.dispatch(new fromActions.SetActiveQuestion(question));
    }

    answerQuestion(answer: Answer) {
        console.log('answer!', answer);
    }

}

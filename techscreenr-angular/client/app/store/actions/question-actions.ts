import { Action } from '@ngrx/store';
import { Question } from '../../../../models';

export const GET_QUESTIONS = '[Questions] Get Questions';
export const SET_ACTIVE_QUESTION = '[Questions] Set Active Question';

export class GetQuestionsRequestAction implements Action {
    readonly type = GET_QUESTIONS;
    constructor() {}
}

export class SetActiveQuestion implements Action {
    readonly type = SET_ACTIVE_QUESTION;
    constructor(public payload: Question) { }
}


export type QuestionAction = GetQuestionsRequestAction |
    SetActiveQuestion;

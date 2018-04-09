import { Action } from '@ngrx/store';
import { Question, Answer } from '../../../../models';

export const GET_QUESTIONS = '[Questions] Get Questions';
export const SET_ACTIVE_QUESTION = '[Questions] Set Active Question';
export const UPDATE_ANSWER = '[Questions] Update Answer';
export const ANSWER_QUESTION = '[Questions] Answer Question';

export class GetQuestionsRequestAction implements Action {
    readonly type = GET_QUESTIONS;
    constructor() {}
}

export class SetActiveQuestion implements Action {
    readonly type = SET_ACTIVE_QUESTION;
    constructor(public payload: Question) { }
}

export class UpdateAnswer implements Action {
    readonly type = UPDATE_ANSWER;
    constructor(public payload: Answer) {}
}

export class AnswerQuestion implements Action {
    readonly type = ANSWER_QUESTION;
    constructor(public payload: Answer) {}
}


export type QuestionAction = GetQuestionsRequestAction |
    SetActiveQuestion |
    UpdateAnswer |
    AnswerQuestion;

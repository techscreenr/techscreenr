import { Action } from '@ngrx/store';
import { Answer, Question, QuestionTypeEnum } from '../../../../models';
import * as fromActions from '../actions/question-actions';

export interface QuestionState {
    questions: Question[];
    activeQuestion: Question;
}

export const QuestionInitialState: QuestionState = {
    questions: [],
    activeQuestion: null
};

function answerReducer(state: Answer, action: fromActions.QuestionAction): Answer {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

function answersReducer(state: Answer[], action: fromActions.QuestionAction) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

function questionReducer(state: Question, action: fromActions.QuestionAction): Question {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export function questionsReducer(state: QuestionState = QuestionInitialState, action: fromActions.QuestionAction): QuestionState {
    switch (action.type) {
        case fromActions.SET_ACTIVE_QUESTION: {
            return {...state, activeQuestion: action.payload};
        }
        case fromActions.GET_QUESTIONS: {
            const mockQuestions: Question[] = [
                {
                    answers: [
                        {
                            type: QuestionTypeEnum.Binary,
                            isSelected: false,
                            content: '',
                            description: 'Test Answer 1',
                            id: 'TA1'
                        }
                    ],
                    description: 'Testing',
                    id: '12',
                    isAnswered: false,
                    type: QuestionTypeEnum.Binary,
                    title: 'Test Question',
                    visited: false
                }
            ];
            return {
                questions: mockQuestions,
                activeQuestion: mockQuestions[0]
            };
        }
        default: {
            return state;
        }
    }
}


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
        case fromActions.ANSWER_QUESTION:
        case fromActions.UPDATE_ANSWER: {
            return {
                ...state,
                isSelected: state.id === action.payload.id,
            };
        }
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

const answerMapping = {
    [QuestionTypeEnum.Binary]: (answer: Answer) => ({...answer, isSelected: true}),
    [QuestionTypeEnum.Checkbox]: (answer: Answer) => ({...answer, isSelected: true}),
    [QuestionTypeEnum.FillInTheBlank]: (answer: Answer) => answer.content,
    [QuestionTypeEnum.Radio]: (answer: Answer) => ({...answer, isSelected: true})
};

function questionReducer(state: Question, action: fromActions.QuestionAction): Question {
    switch (action.type) {
        case fromActions.ANSWER_QUESTION: {
            return {
                ...state,
                answers: state.answers.map(
                    answer => answerReducer(answer, action)
                ),
                answer: answerMapping[action.payload.type](action.payload),
                isAnswered: state.isAnswered ? state.isAnswered : state.isActive
            };
        }
        case fromActions.UPDATE_ANSWER: {
            return {
                ...state,
                answers: state.answers.map(
                    answer => answerReducer(answer, action)
                ),
                answer: answerMapping[action.payload.type](action.payload)
            };
        }
        case fromActions.SET_ACTIVE_QUESTION: {
            return {
                ...state,
                visited: state.visited ? true : state.id === action.payload.id,
                isActive: state.id === action.payload.id
            };
        }
        default: {
            return state;
        }
    }
}

export function questionsReducer(state: QuestionState = QuestionInitialState, action: fromActions.QuestionAction): QuestionState {
    switch (action.type) {
        case fromActions.ANSWER_QUESTION:
        case fromActions.UPDATE_ANSWER: {
            return {
                ...state,
                questions: state.questions.map(
                    question => questionReducer(question, action)
                ),
                activeQuestion: questionReducer(state.activeQuestion, action)
            };
        }
        case fromActions.SET_ACTIVE_QUESTION: {
            return {
                questions: state.questions.map(
                    question => questionReducer(question, action)
                ),
                activeQuestion: {...action.payload}
            };
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
                        },
                        {
                            type: QuestionTypeEnum.Binary,
                            isSelected: false,
                            content: '',
                            description: 'Test Answer 2',
                            id: 'TA2'
                        }
                    ],
                    description: 'Testing',
                    id: '12',
                    isAnswered: false,
                    type: QuestionTypeEnum.Binary,
                    title: 'Question 1',
                    visited: true,
                    answer: null,
                    isActive: true
                },
                {
                    answers: [
                        {
                            type: QuestionTypeEnum.FillInTheBlank,
                            isSelected: false,
                            content: '',
                            description: 'Test Answer 11',
                            id: 'TA11'
                        }
                    ],
                    description: 'Testing',
                    id: '13',
                    isAnswered: false,
                    type: QuestionTypeEnum.FillInTheBlank,
                    title: 'Question 2',
                    visited: false,
                    answer: null,
                    isActive: false
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


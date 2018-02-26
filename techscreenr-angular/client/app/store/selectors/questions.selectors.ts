import { createSelector, createFeatureSelector } from '@ngrx/store';

import { QuestionState } from '../reducers/question-reducer';

export const getQuestionsState = createFeatureSelector<QuestionState>('questions');

export const getQuestions = createSelector(
    getQuestionsState,
    state => state.questions
);

export const getActiveQuestion = createSelector(
    getQuestionsState,
    state => state.activeQuestion
);

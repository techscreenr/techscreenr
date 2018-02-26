import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { questionsReducer, QuestionState } from './question-reducer';
import { environment } from '../../../environments/environment';

export interface State {
    questions: QuestionState;
    router?: RouterReducerState;
}

export const rootReducer = {
    questions: questionsReducer,
    // router: routerReducer
};

export function logger(reducer: ActionReducer<State>): any {
    // default, no options
    return storeLogger()(reducer);
  }

export const metaReducers = environment.production ? [] : [logger];

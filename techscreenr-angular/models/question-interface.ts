import { Answer } from './answer-interface';
import { QuestionTypeEnum } from './question-type.enum';

export interface Question {
    type: QuestionTypeEnum;
    description: string;
    id: string;
    isAnswered: boolean;
    answers: Answer[];
    title: string;
    visited: boolean;
}

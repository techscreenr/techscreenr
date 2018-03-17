import { Answer } from './answer-interface';
import { QuestionTypeEnum } from './question-type.enum';
import { CodeExample } from './code-example.interface';

export interface Question {
    type: QuestionTypeEnum;
    description: string;
    id: string;
    codeExamples?: Array<CodeExample>;
    isAnswered: boolean;
    answers: Answer[];
    title: string;
    visited: boolean;
}

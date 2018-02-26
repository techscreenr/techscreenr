import { QuestionTypeEnum } from './question-type.enum';

export interface Answer {
    description: string;
    id: string;
    isSelected: boolean;
    content: string;
    type: QuestionTypeEnum;
}

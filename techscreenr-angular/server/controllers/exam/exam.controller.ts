import { Request, Response } from 'express-serve-static-core';

import { ExamHelper } from './helpers/exam.helper';

/**
 * @export
 * @class ExamCtrl
 */
export class ExamCtrl {

  examHelper = new ExamHelper;

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof ExamCtrl
   */
  getQuestions(req: Request, res: Response) {
    return 'array of exam questions';
  }
}

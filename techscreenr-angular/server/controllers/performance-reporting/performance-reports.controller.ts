import { Request, Response } from 'express-serve-static-core';

import { RequestResponseHelper } from '../helpers/request-response.helper';

/**
 * @export
 * @class PerformanceReportsCtrl
 */
export class PerformanceReportsCtrl {

  requestResponseHelper: RequestResponseHelper;

  /**
   * @param {Request} req
   * @param {Response} res
   * @memberof PerformanceReportsCtrl
   */
  postExamResults = (req: Request, res: Response) => {

    this.requestResponseHelper.requestResponse(
      res,
      200,
      {
        status: `success`
      }
    );
  }
}

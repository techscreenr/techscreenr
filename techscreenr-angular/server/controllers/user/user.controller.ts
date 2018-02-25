import { Request, Response } from 'express-serve-static-core';

/**
 * @export
 * @class UserCtrl
 */
export class UserCtrl {

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns
     * @memberof UserCtrl
     */
    login = (req: Request, res: Response) => {
      return 'token';
    }
}

import { Response } from 'express-serve-static-core';

/**
 * @export
 * @class RequestResponseHelper
 */
export class RequestResponseHelper {

    /**
     * @param {Response} res
     * @param {number} status
     * @param {*} content
     * @returns {*}
     * @memberof RequestResponseHelper
     */
    requestResponse(res: Response, status: number, content: any): any {
        res.status(status);
        res.json(content);
    }

}

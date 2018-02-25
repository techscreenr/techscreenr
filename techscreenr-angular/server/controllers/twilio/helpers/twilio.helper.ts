import { setTimeout } from 'timers';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';

import * as hbjs from 'handbrake-js';
import { Response } from 'express-serve-static-core';

import { RequestResponseHelper } from '../../helpers/request-response.helper';

/**
 * @export
 * @class TwilioHelper
 */
export class TwilioHelper {

    requestResponseHelper = new RequestResponseHelper();

    /**
     * @param {string} url
     * @param {string} dest
     * @param {Response} res
     * @memberof TwilioHelper
     */
    download(url: string, dest: string, res: Response) {

        const file = fs.createWriteStream(`client/assets/videos/${dest}.mkv`);

        https.get(url, (response: http.IncomingMessage) => {

                response.pipe(file);

                file.on('finish', () => {

                        file.close();

                        hbjs.spawn(
                            {
                                input: `client/assets/videos/${dest}.mkv`,
                                output: `client/assets/videos/${dest}.mp4`
                            }
                        ).on('error', () => {

                            console.log('video convert error');
                        })
                        .on('progress', (progress) => {

                            console.log(
                                'Percent complete: %s, ETA: %s',
                                progress.percentComplete,
                                progress.eta
                            );
                        })
                        .on('complete', () => {

                            fs.unlink(
                                `client/assets/videos/${dest}.mkv`,
                                () => {}
                            );

                            setTimeout(() => {

                                fs.unlink(
                                    `client/assets/videos/${dest}.mp4`,
                                    () => {}
                                );

                                },
                                3600000
                            );

                                this.requestResponseHelper.requestResponse(res, 200,
                                    {
                                        videoURL: `assets/videos/${dest}.mp4`
                                    }
                                );
                            });
                    });
            })
            .on('error', (err) => {

                fs.unlink(`${dest}.mkv`);
                console.log(err.message);

            });
    }
}

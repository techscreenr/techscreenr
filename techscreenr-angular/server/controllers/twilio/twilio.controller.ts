import { Request, Response } from 'express-serve-static-core';
import { setTimeout } from 'timers';

import * as twilio from 'twilio';

import { TwilioHelper } from './helpers/twilio.helper';
import { RequestResponseHelper } from '../helpers/request-response.helper';

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

export class TwilioCtrl {

  twilioHelper = new TwilioHelper();
  requestResponseHelper = new RequestResponseHelper();

  /**
   * @param {Response} res
   * @param {number} status
   * @returns {*}
   * @memberof TwilioCtrl
   */
  getToken = (req: Request, res: Response) => {

    const identity = 'MrBoJanges';

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );

    token.identity = identity;

    const grant = new VideoGrant();

    token.addGrant(grant);

    this.requestResponseHelper.requestResponse(
      res,
      200,
      {
        identity: identity,
        token: token.toJwt()
      }
    );
  }

  /**
   * @param {Response} res
   * @param {number} status
   * @returns {*}
   * @memberof TwilioCtrl
   */
  getTwilioVideo = (req: Request, res: Response) => {

    const Twilio = twilio;

    const client = new Twilio(
      'SK88a58f538bf4a163063ec5df4f0f8421',
      '8bSRcM8BQ5ELOuww3gYX3YNwgGkWgDio',
      {
        accountSid: 'ACd1b4707920db5c13b078db0c02732122'
      }
    );

    client.video.rooms(req.params.roomId).recordings.list()
    .then(
      (recordings) => {

        recordings.forEach(recording => {

          const uri = 'https://video.twilio.com/v1/' +
                      `Rooms/${req.params.roomId}/` +
                      `Recordings/${recording.sid}` +
                      '/Media';

          client.request(
            {
              method: 'GET',
              uri: uri
            }).then(response => {
              const mediaLocation = JSON.parse(response.body).redirect_to;

              this.twilioHelper.download(mediaLocation, `${recording.sid}`, res);
            });
        });
      });
  }

}

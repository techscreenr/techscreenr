import Cat from '../models/cat';
import BaseCtrl from './base';

import * as twilio from 'twilio';
import { request } from 'request';
import * as https from 'https';
import * as fs from 'fs';
import { setTimeout } from 'timers';

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const hbjs = require('handbrake-js');

export default class CatCtrl extends BaseCtrl {
  model = Cat;
  iii: Array<any> = [];
  awsVideoURL: string;

  download = (url, dest, res) => {
    const file = fs.createWriteStream('client/assets/videos/' + `${dest}.mkv`);
    // tslint:disable-next-line:no-shadowed-variable
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();  // close() is async, call cb after close completes.
        console.log('download done');
        hbjs.spawn({ input: 'client/assets/videos/' + `${dest}.mkv`, output: 'client/assets/videos/' + `${dest}.mp4` })
          .on('error', (err) => {
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
            fs.unlink(`${dest}.mkv`, () => {});
            setTimeout(() => {
              fs.unlink('client/assets/videos/' + `${dest}.mp4`, () => {});
            }, 3600000);
            res.send({
              videoURL: 'assets/videos/' + `${dest}.mp4`
            });
          });
      });
    }).on('error', (err) => { // Handle errors
      fs.unlink(`${dest}.mkv`); // Delete the file async. (But we don't check the result)
        console.log(err.message);
    });
  }

  getToken = (req, res) => {
    const identity = 'MrBoJanges';
  // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    const grant = new VideoGrant();
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response.
    res.send({
      identity: identity,
      token: token.toJwt()
    });
  }

  getTwilioVideo = (req, res) => {
    const Twilio = twilio;
    // console.log(req.params.roomId);
    const client = new Twilio(
      'SK88a58f538bf4a163063ec5df4f0f8421',
      '8bSRcM8BQ5ELOuww3gYX3YNwgGkWgDio',
      { accountSid: 'ACd1b4707920db5c13b078db0c02732122' }
    );
    client.video.rooms(req.params.roomId).recordings.list()
    .then((recordings) => {
      recordings.forEach(recording => {

        const uri = 'https://video.twilio.com/v1/' +
              `Rooms/${req.params.roomId}/` +
              `Recordings/${recording.sid}` +
              '/Media';
          client.request({ method: 'GET', uri: uri }).then(response => {

            const mediaLocation = JSON.parse(response.body).redirect_to;
            this.download(mediaLocation, `${recording.sid}`, res);
          });
      });
    });
  }

  sendEmail = (req, res) => {
    console.log(req)
    const Twilio = twilio;
    const arr = [];
    const client = new Twilio(
      'SK88a58f538bf4a163063ec5df4f0f8421',
      '8bSRcM8BQ5ELOuww3gYX3YNwgGkWgDio',
      { accountSid: 'ACd1b4707920db5c13b078db0c02732122' }
    );
    client.video.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').recordings.list()
    .then((recordings) => {
      recordings.forEach(recording => {

        console.log(recording.sid);
      });
    // client.video.recordings.list({
    //   status: 'completed',
    //   type: 'video',
    // }).then((rooms) => {
    //   rooms.forEach(room => {
    //     console.log(room)
    //     console.log(new Date(room.dateCreated));
    //     if (room.type === 'video') {
    //       const uri = 'https://video.twilio.com/v1/' +
    //           `Rooms/${room.groupingSids['room_sid']}/` +
    //           `Recordings/${room.sid}` +
    //           '/Media';
    //       client.request({ method: 'GET', uri: uri }).then(response => {

    //         const mediaLocation = JSON.parse(response.body).redirect_to;

    //         this.iii.push({videoUrl: mediaLocation, date: room.dateCreated });
    //       });
    //     }
    //   });
      return this.iii;
    }).then(() => {

      res.send({
        room: this.iii
      });
      this.iii = [];
    });
  }
}

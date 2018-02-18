import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as twilioVideo from 'twilio-video';

@Injectable()
export class TwilioService {
  twilioApi = twilioVideo;
  room: any;

  constructor(private http: HttpClient) { }

  getTwilioToken(): Observable<any> {
    return this.http.get<any>('/api/token');
  }

  getTwilioVideo(roomId?: string): Observable<any> {
    // return this.http.get<any>(`/api/getVideo/${roomId}`); // Save for later

    // To Do: Delete line 30 below and use room ID passed from email URL
    return this.http.get('/api/getVideo/RMe19f842575ee3ce6e636d9ea795ab091');
  }

  twilioDisconnect() {
    if (this.room) {
      this.room.disconnect();
    }
  }

  startPreview() {
    this.getTwilioToken().subscribe(
      data => {
        this.twilioConnect(data.token);
      },
      (error) => console.log(error)
    );
  }

  // To DO: Do not let roomId be optional
  getVideo(roomId?: string) {
    // const myFirstPromise = new Promise((resolve, reject) => {

      this.getTwilioVideo(roomId).subscribe(
        (data) => {
          console.log(data);
          // return resolve(data);
        },
        (error) => console.log(error)
        // error => reject({error: 'Error'})
      );
    // });
    // return myFirstPromise;
  }

  twilioConnect(token) {
    this.twilioApi.connect(token, {
      audio: false,
      name: 'techScreenr',
      type: 'group',
      video: { width: 640 }
    }).then((room) => {

       console.log('Successfully joined a Room: ', room);
      room.on('participantConnected', (participant) => {
        // console.log('A remote Participant connected: ', participant);
      });
      this.room = room;
    }, (error) => {
        console.error('Unable to connect to Room: ' +  error.message);
    });
  }

}

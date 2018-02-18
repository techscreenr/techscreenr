import { Component, OnInit } from '@angular/core';

import { TwilioService } from '../twilio.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  videoURL: string;

  constructor(private twilioService: TwilioService) { }

  ngOnInit() {
    //
    // this.twilioService.getVideo();
    // .then((value) => {
    //   if (value.error) {
    //     console.log('Video Not Received');
    //   }
    //   // console.log(value.videoURL)
    //   this.videoURL = value.videoURL;
    // });
    // this.twilioService.twilioDisconnect();
  }

}

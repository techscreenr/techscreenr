import { Component, OnInit } from '@angular/core';

import { TwilioService } from '../twilio.service';

import { createLocalVideoTrack } from 'twilio-video';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  Twilio: any;
  token: any;

  constructor(private twilioService: TwilioService) { }

  ngOnInit() {
    this.twilioService.startPreview();

    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media-ctr');
      localMediaContainer.appendChild(track.attach());
    });
  }

}

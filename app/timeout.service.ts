import { Injectable, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable()
export class TimeoutService {
  private IDLE_TIMEOUT: number = 30; //seconds
  private static _idleSecondsCounter: number = 0;

  constructor( @Inject(DOCUMENT) private document: any) {
    TimeoutService._idleSecondsCounter = 0;
    window.addEventListener('mousemove', (event) => {
      TimeoutService._idleSecondsCounter = 0;
    });
    window.addEventListener('click', function () {
      TimeoutService._idleSecondsCounter = 0;
    });

    window.addEventListener('keypress ', function () {
      this._idleSecondsCounter = 0;
    });

    window.setInterval(() => {
      TimeoutService._idleSecondsCounter++;
      if (TimeoutService._idleSecondsCounter >= this.IDLE_TIMEOUT) {
        alert("Time expired!");
        document.location.href = "logout.html";
      }
    }, 1000);

  }
}

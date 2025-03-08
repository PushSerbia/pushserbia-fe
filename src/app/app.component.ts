import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private countdownInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  private startCountdown(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  }

  private updateCountdown(): void {
    const targetDate = new Date("2025-03-31T23:59:59");
    const now = new Date();
    const timeDiff = targetDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      clearInterval(this.countdownInterval);
      return;
    }

    this.days = Math.floor(timeDiff / 86400000);
    this.hours = Math.floor((timeDiff % 86400000) / 3600000);
    this.minutes = Math.floor((timeDiff % 3600000) / 60000);
    this.seconds = Math.floor((timeDiff % 60000) / 1000);
  }
}

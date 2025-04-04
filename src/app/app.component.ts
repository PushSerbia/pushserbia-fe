import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  savingInProgress = signal(false);
  emailSent = signal(false);

  private countdownInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  onNotifyMeSubmitted(): void {
    if (this.savingInProgress()) {
      return;
    }
    if (this.emailCtrl.invalid) {
      this.emailCtrl.markAllAsTouched();
      return;
    }

    // todo: move it to the independent service
    // todo: make environment configurations
    this.savingInProgress.set(true)
    this.httpClient.post('https://api.pushserbia.com/v1/integrations/subscribe', { email: this.emailCtrl.value, tags: 'coming-soon' }).pipe(finalize(() => {
      this.savingInProgress.set(false)
    })).subscribe(() => {
      this.emailSent.set(true);
    });
  }

  private startCountdown(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  }

  private updateCountdown(): void {
    const targetDate = new Date("2025-04-13T23:59:59");
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

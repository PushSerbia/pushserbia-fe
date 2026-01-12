import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { donationOptions } from '../../../../core/donation/donation-option';

@Component({
  selector: 'app-landing-pricing',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './landing-pricing.html',
  styleUrl: './landing-pricing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPricing {
  donationOptions = donationOptions;
}

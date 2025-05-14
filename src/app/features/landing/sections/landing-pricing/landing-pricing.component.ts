import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { donationOptions } from '../../../../core/donation/donation-option';

@Component({
  selector: 'app-landing-pricing',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './landing-pricing.component.html',
  styleUrl: './landing-pricing.component.css',
})
export class LandingPricingComponent {
  donationOptions = donationOptions;
}

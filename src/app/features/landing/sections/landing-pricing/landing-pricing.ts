import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupportOption, supportOptions } from '../../../../core/donation/donation-option';

@Component({
  selector: 'app-landing-pricing',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './landing-pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPricing {
  supportOptions = supportOptions;

  openExternal(option: SupportOption): void {
    window.open(option.externalUrl, '_blank', 'noopener,noreferrer');
  }
}

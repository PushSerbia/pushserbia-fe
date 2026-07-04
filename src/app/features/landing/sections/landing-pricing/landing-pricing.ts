import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  formatSupportPrice,
  SupportOption,
  supportOptions,
} from '../../../../core/donation/donation-option';

@Component({
  selector: 'app-landing-pricing',
  imports: [RouterLink],
  templateUrl: './landing-pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPricing {
  supportOptions = supportOptions;
  protected readonly formatPrice = formatSupportPrice;

  openExternal(option: SupportOption): void {
    window.open(option.externalUrl, '_blank', 'noopener,noreferrer');
  }
}

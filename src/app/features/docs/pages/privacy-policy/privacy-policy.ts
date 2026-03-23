import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicy {
  constructor() {
    inject(SeoService).update({
      title: 'Politika privatnosti',
      description:
        'Politika privatnosti Push Serbia platforme — kako prikupljamo, koristimo i štitimo vaše podatke.',
    });
  }
}

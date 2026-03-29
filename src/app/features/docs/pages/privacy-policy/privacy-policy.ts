import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../../core/seo/seo-manager';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicy {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Politika privatnosti',
      description:
        'Politika privatnosti Push Serbia platforme — kako prikupljamo, koristimo i štitimo vaše podatke.',
    });
  }
}

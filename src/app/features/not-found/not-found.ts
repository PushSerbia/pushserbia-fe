import { ChangeDetectionStrategy, Component, inject, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicLayout } from '../../shared/layout/landing-layout/basic-layout';
import { SeoManager } from '../../core/seo/seo-manager';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, BasicLayout],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Stranica nije pronađena',
      description:
        'Tražena stranica ne postoji ili je premeštena. Vrati se na početnu i nastavi da istražuješ Push Serbia zajednicu.',
      robots: 'noindex, nofollow',
    });

    const response = inject(RESPONSE_INIT, { optional: true });
    if (response) {
      response.status = 404;
    }
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-brand-center',
  imports: [RouterLink],
  templateUrl: './brand-center.html',
  styleUrl: './brand-center.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCenter {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Brend centar',
      description:
        'Push Serbia brend resursi — preuzmite logotip, saznajte više o bojama, tipografiji i pravilima vizuelnog identiteta naše zajednice.',
    });
  }
}

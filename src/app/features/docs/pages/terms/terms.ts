import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../../core/seo/seo-manager';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terms {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Uslovi korišćenja',
      description:
        'Uslovi korišćenja Push Serbia platforme — pravila i obaveze korisnika.',
    });
  }
}

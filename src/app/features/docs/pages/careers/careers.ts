import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-careers',
  imports: [RouterLink],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Careers {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Karijere',
      description:
        'Pridruži se Push Serbia timu — pogledaj otvorene pozicije, mogućnosti za saradnju i kako možeš doprineti razvoju open-source projekata.',
    });
  }
}

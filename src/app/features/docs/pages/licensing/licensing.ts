import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-licensing',
  imports: [RouterLink],
  templateUrl: './licensing.html',
  styleUrl: './licensing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Licensing {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Licence',
      description:
        'Informacije o licencama koje koristi Push Serbia platforma i open-source projekti.',
    });
  }
}

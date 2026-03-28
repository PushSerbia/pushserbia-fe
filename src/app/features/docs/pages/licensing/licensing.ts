import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-licensing',
  imports: [RouterLink],
  templateUrl: './licensing.html',
  styleUrl: './licensing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Licensing {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Licence',
      description:
        'Informacije o licencama koje koristi Push Serbia platforma i open-source projekti.',
    });
  }
}

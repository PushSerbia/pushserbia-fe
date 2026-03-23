import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terms {
  constructor() {
    inject(SeoService).update({
      title: 'Uslovi korišćenja',
      description:
        'Uslovi korišćenja Push Serbia platforme — pravila i obaveze korisnika.',
    });
  }
}

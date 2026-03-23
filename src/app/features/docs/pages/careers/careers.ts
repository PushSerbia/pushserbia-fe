import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-careers',
  imports: [RouterLink],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Careers {
  constructor() {
    inject(SeoService).update({
      title: 'Karijere',
      description:
        'Pridruži se Push Serbia timu — otvorene pozicije i mogućnosti za saradnju.',
    });
  }
}

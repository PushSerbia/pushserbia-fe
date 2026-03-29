import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../../core/seo/seo-manager';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'O nama',
      description:
        'Saznaj više o Push Serbia zajednici — ko smo, šta radimo i zašto podržavamo open-source projekte u Srbiji.',
    });
  }
}

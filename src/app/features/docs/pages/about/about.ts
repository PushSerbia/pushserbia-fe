import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'O nama',
      description:
        'Saznaj više o Push Serbia zajednici — ko smo, šta radimo i zašto podržavamo open-source projekte u Srbiji.',
    });
  }
}

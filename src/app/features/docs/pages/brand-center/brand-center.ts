import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-brand-center',
  imports: [RouterLink],
  templateUrl: './brand-center.html',
  styleUrl: './brand-center.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCenter {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Brend centar',
      description:
        'Push Serbia brend resursi — logotip, boje, tipografija i smernice za korišćenje.',
    });
  }
}

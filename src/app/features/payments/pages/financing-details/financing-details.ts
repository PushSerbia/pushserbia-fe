import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-financing-details',
  imports: [RouterLink],
  templateUrl: './financing-details.html',
  styleUrl: './financing-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancingDetails {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Podrži nas',
      description:
        'Podrži Push Serbia zajednicu — jednokratna donacija ili mesečna pretplata za razvoj open-source projekata.',
    });
  }
}

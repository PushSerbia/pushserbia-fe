import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-financing-details',
  imports: [RouterLink],
  templateUrl: './financing-details.html',
  styleUrl: './financing-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancingDetails {
  constructor() {
    inject(SeoService).update({
      title: 'Podrži nas',
      description:
        'Podrži Push Serbia zajednicu — jednokratna donacija ili mesečna pretplata za razvoj open-source projekata.',
    });
  }
}

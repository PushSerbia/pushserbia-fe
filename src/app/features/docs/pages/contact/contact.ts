import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Kontakt',
      description:
        'Kontaktiraj Push Serbia tim — email, društvene mreže, Slack i GitHub.',
    });
  }
}

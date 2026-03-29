import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Kontakt',
      description:
        'Kontaktiraj Push Serbia tim — email, društvene mreže, Slack i GitHub.',
    });
  }
}

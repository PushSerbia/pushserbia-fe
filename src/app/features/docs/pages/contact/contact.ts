import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoManager } from '../../../../core/seo/seo-manager';
import { EXTERNAL_LINKS } from '../../../../shared/external-links';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  readonly links = EXTERNAL_LINKS;
  private readonly seo = inject(SeoManager);

  constructor() {
    this.seo.update({
      title: 'Kontakt',
      description:
        'Kontaktiraj Push Serbia tim putem email-a, društvenih mreža, Slack-a ili GitHub-a. Tu smo da odgovorimo na sva tvoja pitanja i predloge.',
    });
  }
}

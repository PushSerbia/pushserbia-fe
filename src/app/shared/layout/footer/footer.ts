import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IntegrationsApi } from '../../../core/integrations/integrations-api';
import { EXTERNAL_LINKS } from '../../external-links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly links = EXTERNAL_LINKS;
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  newsletterStatus = signal<'idle' | 'loading' | 'success' | 'error' | 'unavailable' | 'invalid'>('idle');

  private integrationsService = inject(IntegrationsApi);

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  onNewsletterSubmit() {
    if (!this.newsletterEmail || !this.emailRegex.test(this.newsletterEmail)) {
      this.newsletterStatus.set('invalid');
      return;
    }

    this.newsletterStatus.set('loading');

    this.integrationsService.subscribeForNewsletter(this.newsletterEmail).subscribe({
      next: () => {
        this.newsletterStatus.set('success');
        this.newsletterEmail = '';
      },
      error: (err: any) => {
        this.newsletterStatus.set(err?.status === 503 ? 'unavailable' : 'error');
      },
    });
  }
}

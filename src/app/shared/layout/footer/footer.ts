import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IntegrationsService } from '../../../core/integrations/integrations.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  newsletterStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  private integrationsService = inject(IntegrationsService);

  onNewsletterSubmit() {
    if (!this.newsletterEmail) return;

    this.newsletterStatus.set('loading');

    this.integrationsService.subscribeForNewsletter(this.newsletterEmail).subscribe({
      next: () => {
        this.newsletterStatus.set('success');
        this.newsletterEmail = '';
      },
      error: () => {
        this.newsletterStatus.set('error');
      },
    });
  }
}

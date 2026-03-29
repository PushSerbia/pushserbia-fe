import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupportOption, supportOptions } from '../../../../core/donation/donation-option';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-payment-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPage implements OnInit {
  private seo = inject(SeoService);

  supportOptions = supportOptions;

  ngOnInit(): void {
    this.seo.update({
      title: 'Podrška',
      description: 'Podrži Push Serbia zajednicu kroz Buy Me a Coffee.',
    });
  }

  openExternal(option: SupportOption): void {
    window.open(option.externalUrl, '_blank', 'noopener,noreferrer');
  }
}

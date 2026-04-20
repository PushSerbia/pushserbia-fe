import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  robots?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = 'Push Serbia';
const DEFAULT_DESCRIPTION =
  'Pridruži se Push Serbia zajednici! Predloži projekte, glasaj za inicijative i doprinesi razvoju open-source softvera koji mijenja društvo.';
const DEFAULT_IMAGE = 'https://pushserbia.com/pushserbia.png';
const BASE_URL = 'https://pushserbia.com';
const MAX_DESCRIPTION_LENGTH = 160;

@Injectable({ providedIn: 'root' })
export class SeoManager {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  update(config: SeoConfig): void {
    const title = config.title ? `${config.title} | ${SITE_NAME}` : SITE_NAME;
    const description = this.truncateDescription(config.description || DEFAULT_DESCRIPTION);
    const image = config.image || DEFAULT_IMAGE;
    const url = config.url || `${BASE_URL}${this.router.url.split('?')[0]}`;
    const type = config.type || 'website';

    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (config.robots) {
      this.meta.updateTag({ name: 'robots', content: config.robots });
    } else {
      this.meta.removeTag('name="robots"');
    }

    this.updateCanonical(url);

    if (config.jsonLd) {
      this.updateJsonLd(config.jsonLd);
    } else {
      this.removeJsonLd();
    }
  }

  private updateCanonical(url: string): void {
    const link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.setAttribute('href', url);
    }
  }

  private updateJsonLd(data: Record<string, unknown>): void {
    this.removeJsonLd();
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-dynamic-seo', 'true');
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...data });
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    const existing = this.document.querySelector('script[data-dynamic-seo="true"]');
    existing?.remove();
  }

  private truncateDescription(description: string): string {
    const trimmed = description.trim();
    if (trimmed.length <= MAX_DESCRIPTION_LENGTH) {
      return trimmed;
    }
    const sliced = trimmed.slice(0, MAX_DESCRIPTION_LENGTH - 1);
    const lastSpace = sliced.lastIndexOf(' ');
    const cutoff = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
    return `${cutoff.replace(/[\s.,;:!?-]+$/, '')}…`;
  }
}

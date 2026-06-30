import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqEntry {
  title: string;
  description: string;
}

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  /** Robots directive, e.g. `noindex, nofollow`. Omit to leave the page indexable. */
  robots?: string;
  jsonLd?: Record<string, unknown>;
  /** Explicit breadcrumb trail. When omitted, an indexable page gets one auto-generated. */
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_NAME = 'Push Serbia';
const DEFAULT_DESCRIPTION =
  'Pridruži se Push Serbia zajednici! Predloži projekte, glasaj za inicijative i doprinesi razvoju open-source softvera koji mijenja društvo.';
const DEFAULT_IMAGE = 'https://pushserbia.com/pushserbia.png';
const BASE_URL = 'https://pushserbia.com';

// Human-readable labels for known top-level route segments, used to add a
// section level to breadcrumbs on detail pages (e.g. Početna > Blog > Post).
const SECTION_LABELS: Record<string, string> = {
  projekti: 'Projekti',
  blog: 'Blog',
};

@Injectable({ providedIn: 'root' })
export class SeoManager {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  update(config: SeoConfig): void {
    // Append the site name as a suffix, unless the page already leads with the
    // brand (e.g. the home page) — that avoids a duplicated "Push Serbia".
    const title = config.title
      ? config.title.includes(SITE_NAME)
        ? config.title
        : `${config.title} | ${SITE_NAME}`
      : SITE_NAME;
    const description = config.description || DEFAULT_DESCRIPTION;
    const image = config.image || DEFAULT_IMAGE;
    const cleanPath = this.router.url.split('?')[0].split('#')[0];
    const url = config.url || `${BASE_URL}${cleanPath}`;
    const type = config.type || 'website';

    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

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

    // Breadcrumbs: use an explicit trail when provided, otherwise auto-generate
    // one for indexable pages. Noindex pages don't get breadcrumb markup.
    const isNoIndex = (config.robots ?? '').includes('noindex');
    const breadcrumbs =
      config.breadcrumbs ?? (isNoIndex ? [] : this.buildBreadcrumbs(config.title, cleanPath));
    if (breadcrumbs.length > 1) {
      this.updateBreadcrumbJsonLd(breadcrumbs);
    } else {
      this.removeBreadcrumbJsonLd();
    }
  }

  private buildBreadcrumbs(title: string | undefined, cleanPath: string): BreadcrumbItem[] {
    const segments = cleanPath.split('/').filter(Boolean);
    // The home page (no segments) or an untitled page gets no breadcrumb.
    if (segments.length === 0 || !title) {
      return [];
    }

    const items: BreadcrumbItem[] = [{ name: 'Početna', url: `${BASE_URL}/` }];

    // Add a known section level for detail pages (e.g. Blog, Projekti).
    if (segments.length > 1) {
      const sectionLabel = SECTION_LABELS[segments[0]];
      if (sectionLabel) {
        items.push({ name: sectionLabel, url: `${BASE_URL}/${segments[0]}` });
      }
    }

    items.push({ name: title, url: `${BASE_URL}/${segments.join('/')}` });
    return items;
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link') as HTMLLinkElement;
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
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

  private updateBreadcrumbJsonLd(items: BreadcrumbItem[]): void {
    this.removeBreadcrumbJsonLd();
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-dynamic-seo-breadcrumb', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
    this.document.head.appendChild(script);
  }

  private removeBreadcrumbJsonLd(): void {
    const existing = this.document.querySelector('script[data-dynamic-seo-breadcrumb="true"]');
    existing?.remove();
  }

  /**
   * Inject FAQPage structured data. Owned by the component that renders the FAQ
   * (only the home page today); call removeFaqJsonLd() from its ngOnDestroy.
   */
  setFaqJsonLd(items: FaqEntry[]): void {
    this.removeFaqJsonLd();
    if (!items.length) {
      return;
    }
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-dynamic-seo-faq', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.title,
        acceptedAnswer: { '@type': 'Answer', text: item.description },
      })),
    });
    this.document.head.appendChild(script);
  }

  removeFaqJsonLd(): void {
    const existing = this.document.querySelector('script[data-dynamic-seo-faq="true"]');
    existing?.remove();
  }
}

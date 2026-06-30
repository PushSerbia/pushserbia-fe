import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LandingHero } from './sections/landing-hero/landing-hero';
import { LandingBenefits } from './sections/landing-benefits/landing-benefits';
import { LandingProjects } from './sections/landing-projects/landing-projects';
import { LandingHowTo } from './sections/landing-how-to/landing-how-to';
import { LandingTestimonials } from './sections/landing-testimonials/landing-testimonials';
import { LandingFaq } from './sections/landing-faq/landing-faq';
import { LandingCta } from './sections/landing-cta/landing-cta';
import { BasicLayout } from '../../shared/layout/landing-layout/basic-layout';
import { SeoManager } from '../../core/seo/seo-manager';

@Component({
  selector: 'app-landing',
  imports: [
    LandingHero,
    LandingBenefits,
    LandingProjects,
    LandingHowTo,
    LandingTestimonials,
    LandingFaq,
    LandingCta,
    BasicLayout,
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly seo = inject(SeoManager);

  constructor() {
    // Brand-forward, concise home page title (≈49 chars). Google was ignoring
    // the previous generic, keyword-led title ("Open-source zajednica za...")
    // and rewriting the SERP title down to just "Push Serbia". Leading with the
    // brand and a specific value proposition gives Google a title it can use.
    this.seo.update({
      title: 'Push Serbia — open-source projekti za opšte dobro',
      url: 'https://pushserbia.com',
    });
  }
}

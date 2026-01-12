import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingHero } from './sections/landing-hero/landing-hero';
import { LandingProjects } from './sections/landing-projects/landing-projects';
import { LandingHowTo } from './sections/landing-how-to/landing-how-to';
import { LandingPricing } from './sections/landing-pricing/landing-pricing';
import { LandingFaq } from './sections/landing-faq/landing-faq';
import { BasicLayout } from '../../shared/layout/landing-layout/basic-layout';

@Component({
  selector: 'app-landing',
  imports: [LandingHero, LandingProjects, LandingHowTo, LandingPricing, LandingFaq, BasicLayout],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}

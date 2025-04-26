import { Component } from '@angular/core';
import { LandingHeroComponent } from './sections/landing-hero/landing-hero.component';
import { LandingProjectsComponent } from './sections/landing-projects/landing-projects.component';
import { LandingHowToComponent } from './sections/landing-how-to/landing-how-to.component';
import { LandingPricingComponent } from './sections/landing-pricing/landing-pricing.component';
import { LandingFaqComponent } from './sections/landing-faq/landing-faq.component';
import { BasicLayoutComponent } from '../../shared/layout/landing-layout/basic-layout.component';

@Component({
  selector: 'app-landing',
  imports: [
    LandingHeroComponent,
    LandingProjectsComponent,
    LandingHowToComponent,
    LandingPricingComponent,
    LandingFaqComponent,
    BasicLayoutComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}

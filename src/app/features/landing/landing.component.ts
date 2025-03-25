import { Component } from '@angular/core';
import { LandingHeaderComponent } from './sections/landing-header/landing-header.component';
import { LandingHeroComponent } from './sections/landing-hero/landing-hero.component';
import { LandingProjectsComponent } from './sections/landing-projects/landing-projects.component';
import { LandingHowToComponent } from './sections/landing-how-to/landing-how-to.component';
import { LandingPricingComponent } from './sections/landing-pricing/landing-pricing.component';
import { LandingFaqComponent } from './sections/landing-faq/landing-faq.component';
import { LandingFooterComponent } from './sections/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing',
  imports: [
    LandingHeaderComponent,
    LandingHeroComponent,
    LandingProjectsComponent,
    LandingHowToComponent,
    LandingPricingComponent,
    LandingFaqComponent,
    LandingFooterComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
}

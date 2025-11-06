import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-hero',
  imports: [RouterLink, TranslateModule],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.css',
})
export class LandingHeroComponent {
  private translate = inject(TranslateService);
  members = ['MK', 'SV', 'MM', 'DP'];

  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}

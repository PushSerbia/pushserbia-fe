import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-how-to',
  imports: [RouterLink, TranslateModule],
  templateUrl: './landing-how-to.component.html',
  styleUrl: './landing-how-to.component.css',
})
export class LandingHowToComponent {
  private translate = inject(TranslateService);
  get currentLang(): 'sr' | 'en' {
    return (this.translate.currentLang as 'sr' | 'en') || 'sr';
  }
}

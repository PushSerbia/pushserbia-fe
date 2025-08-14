import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private themeService = inject(ThemeService);
  private translate = inject(TranslateService);

  constructor() {
    this.themeService.applyTheme(this.themeService.isDarkMode());

    // Initialize language: prefer Serbian if browser language starts with 'sr', otherwise English
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en';
    const lang = browserLang.toLowerCase().startsWith('sr') ? 'sr' : 'en';
    this.translate.setDefaultLang('sr');
    this.translate.use(lang);
  }
}

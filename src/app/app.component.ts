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

    // Initialize language: use persisted choice if available; else prefer Serbian if browser lang starts with 'sr', otherwise English
    let lang: 'sr' | 'en' = 'sr';
    try {
      if (typeof window !== 'undefined' && window?.localStorage) {
        const saved = window.localStorage.getItem('lang');
        if (saved === 'sr' || saved === 'en') {
          lang = saved;
        } else {
          const browserLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en';
          lang = browserLang.toLowerCase().startsWith('sr') ? 'sr' : 'en';
        }
      }
    } catch {
      const browserLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en';
      lang = browserLang.toLowerCase().startsWith('sr') ? 'sr' : 'en';
    }

    this.translate.setDefaultLang('sr');
    this.translate.use(lang);
  }
}

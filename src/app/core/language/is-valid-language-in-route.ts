import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './language';
import { getPreferredLang } from './get-prefered-lang';
import { SUPPORTED_LANGUAGES } from './supported-languages';

export const isValidLanguageInRoute: CanActivateFn = (route) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  const lang = (route.params['lang'] as Lang) || getPreferredLang();
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return router.parseUrl(`/${getPreferredLang()}`);
  }
  // Set selected language and persist
  translate.setDefaultLang('sr');
  translate.use(lang);
  try {
    if (typeof window !== 'undefined' && window?.localStorage) {
      window.localStorage.setItem('lang', lang);
    }
  } catch {
    // ignore storage issues
  }
  return true;
};

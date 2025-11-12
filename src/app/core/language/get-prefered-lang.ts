import { Lang } from './language';

export function getPreferredLang(): Lang {
  // default based on browser language, SSR-safe
  let preferred: Lang = 'sr';
  try {
    if (typeof window !== 'undefined' && window?.localStorage) {
      const saved = window.localStorage.getItem('lang');
      if (saved === 'sr' || saved === 'en') {
        preferred = saved;
      } else {
        const browserLang =
          typeof navigator !== 'undefined' && navigator.language
            ? navigator.language
            : 'en';
        preferred = browserLang.toLowerCase().startsWith('sr') ? 'sr' : 'en';
      }
    } else {
      const browserLang =
        typeof navigator !== 'undefined' && (navigator as Navigator).language
          ? (navigator as Navigator).language
          : 'en';
      preferred = browserLang.toLowerCase().startsWith('sr') ? 'sr' : 'en';
    }
  } catch {
    preferred = 'sr';
  }
  return preferred;
}

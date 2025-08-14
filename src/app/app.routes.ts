import { Routes, CanActivateFn, Router, RedirectFunction } from '@angular/router';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'sr' | 'en';
const SUPPORTED_LANGS: readonly Lang[] = ['sr', 'en'] as const;

function getPreferredLang(): Lang {
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


const validateLangGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  const lang = (route.params['lang'] as Lang) || getPreferredLang();
  if (!SUPPORTED_LANGS.includes(lang)) {
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


const childRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: 'placanja',
    loadChildren: () =>
      import('./features/payments/payments.routes').then((m) => m.paymentsRoutes),
  },
  {
    path: 'dokumentacija',
    loadChildren: () =>
      import('./features/docs/docs.routes').then((m) => m.docsRoutes),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.blogRoutes),
  },
  {
    path: 'autentikacija',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./features/profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'projekti',
    loadChildren: () =>
      import('./features/projects/projects.routes').then(
        (m) => m.projectsRoutes,
      ),
  },
];

const rootRedirect: RedirectFunction = () => `/${getPreferredLang()}`;

const wildcardRedirect: RedirectFunction = (data) => {
  const lang = getPreferredLang();
  const segments = (data.url ?? []).map((s) => s.path).filter(Boolean);
  const first = segments[0] ?? '';

  // If already prefixed with supported lang, keep as-is
  if (first === 'sr' || first === 'en') {
    return `/${segments.join('/')}` + buildQueryAndFragment(data.queryParams, data.fragment);
  }

  // Build new URL with preferred lang
  const path = segments.length ? `/${segments.join('/')}` : '';
  const base = `/${lang}${path}`;
  return base + buildQueryAndFragment(data.queryParams, data.fragment);
};

function buildQueryAndFragment(queryParams: Record<string, any> | undefined, fragment: string | null | undefined): string {
  const qp = queryParams && Object.keys(queryParams).length
    ? '?' + new URLSearchParams(
        Object.entries(queryParams).reduce<Record<string, string>>((acc, [k, v]) => {
          // Normalize values to string for URLSearchParams
          if (v == null) {
            return acc;
          }
          if (Array.isArray(v)) {
            // Repeat key for array values
            v.forEach((val) => {
              acc[k] = String(val);
            });
          } else {
            acc[k] = String(v);
          }
          return acc;
        }, {}),
      ).toString()
    : '';
  const frag = fragment ? `#${fragment}` : '';
  return `${qp}${frag}`;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: rootRedirect },
  { path: ':lang', canActivate: [validateLangGuard], children: childRoutes },
  { path: '**', redirectTo: wildcardRedirect },
];

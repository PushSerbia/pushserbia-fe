import { Routes } from '@angular/router';

export const docsRoutes: Routes = [
  {
    path: 'o-nama',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'politika-privatnosti',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then(
        (m) => m.PrivacyPolicy,
      ),
  },
  {
    path: 'licence',
    loadComponent: () =>
      import('./pages/licensing/licensing').then((m) => m.Licensing),
  },
  {
    path: 'uslovi-koriscenja',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'brend-centar',
    loadComponent: () =>
      import('./pages/brand-center/brand-center').then((m) => m.BrandCenter),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'karijere',
    loadComponent: () =>
      import('./pages/careers/careers').then((m) => m.Careers),
  },
];

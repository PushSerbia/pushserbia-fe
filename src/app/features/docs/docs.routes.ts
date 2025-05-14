import { Routes } from '@angular/router';

export const docsRoutes: Routes = [
  {
    path: 'o-nama',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'politika-privatnosti',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'licence',
    loadComponent: () => import('./pages/licensing/licensing.component').then(m => m.LicensingComponent),
  },
  {
    path: 'uslovi-koriscenja',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: 'brend-centar',
    loadComponent: () => import('./pages/brand-center/brand-center.component').then(m => m.BrandCenterComponent),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'karijere',
    loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent),
  },
];

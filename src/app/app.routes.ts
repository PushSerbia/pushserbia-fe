import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'finansiranje',
    loadComponent: () => import('./features/landing/pages/financing-details/financing-details.component').then(m => m.FinancingDetailsComponent),
  },
  {
    path: 'placanje',
    loadComponent: () => import('./features/landing/pages/payment-page/payment-page.component').then(m => m.PaymentPageComponent),
  },
  {
    path: 'o-nama',
    loadComponent: () => import('./features/landing/pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./features/landing/pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'politika-privatnosti',
    loadComponent: () => import('./features/landing/pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'licence',
    loadComponent: () => import('./features/landing/pages/licensing/licensing.component').then(m => m.LicensingComponent),
  },
  {
    path: 'uslovi-koriscenja',
    loadComponent: () => import('./features/landing/pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: 'karijere',
    loadComponent: () => import('./features/landing/pages/careers/careers.component').then(m => m.CareersComponent),
  },
  {
    path: 'brend-centar',
    loadComponent: () => import('./features/landing/pages/brand-center/brand-center.component').then(m => m.BrandCenterComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/landing/pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/landing/pages/blog-post/blog-post.component').then(m => m.BlogPostComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./features/projects/projects.routes').then(
        (m) => m.projectsRoutes,
      ),
  },
];

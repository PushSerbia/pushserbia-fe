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
    path: 'kontakt',
    loadComponent: () => import('./features/landing/pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'karijere',
    loadComponent: () => import('./features/landing/pages/careers/careers.component').then(m => m.CareersComponent),
  },
  {
    path: 'docs',
    loadChildren: () => import('./features/docs/docs.routes').then(m => m.docsRoutes),
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

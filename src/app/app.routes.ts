import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payments/payments.routes').then((m) => m.paymentsRoutes),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./features/docs/pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: 'karijere',
    loadComponent: () =>
      import('./features/docs/pages/careers/careers.component').then(
        (m) => m.CareersComponent,
      ),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./features/docs/docs.routes').then((m) => m.docsRoutes),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.blogRoutes),
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

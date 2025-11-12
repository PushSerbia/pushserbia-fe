import { Routes } from '@angular/router';
import { isValidLanguageInRoute } from './core/language/is-valid-language-in-route';
import {
  rootRedirect,
  wildcardRedirect,
} from './core/language/routing-redirections';

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
      import('./features/payments/payments.routes').then(
        (m) => m.paymentsRoutes,
      ),
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
  {
    path: 'projects',
    loadChildren: () =>
      import('./features/projects/projects.routes').then(
        (m) => m.projectsRoutes,
      ),
  },
];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: rootRedirect },
  {
    path: ':lang',
    canActivate: [isValidLanguageInRoute],
    children: childRoutes,
  },
  { path: '**', redirectTo: wildcardRedirect },
];

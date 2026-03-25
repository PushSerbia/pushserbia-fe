import { Route } from '@angular/router';
import { Account } from './account/account';

export const authRoutes: Route[] = [
  {
    path: 'prijava',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'preusmeravanje/linkedin',
    resolve: [],
    component: Account,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'prijava',
  },
  {
    path: '**',
    redirectTo: 'prijava',
  },
];

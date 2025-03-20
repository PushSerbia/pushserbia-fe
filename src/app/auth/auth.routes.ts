import { Route } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
  {
    path: 'redirect/linkedin',
    resolve: [],
    component: AccountComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

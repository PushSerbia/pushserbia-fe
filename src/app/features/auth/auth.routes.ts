import { Route } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';

export const authRoutes: Route[] = [
  {
    path: 'prijava',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'registracija',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent,
      ),
  },
  {
    path: 'preusmeravanje/linkedin',
    resolve: [],
    component: AccountComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'prijava',
  },
];

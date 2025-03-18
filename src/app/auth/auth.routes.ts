import { Route } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';


export const authRoutes: Route[] = [{
  path: 'login',
  loadComponent: () => LoginPageComponent
}, {
  path: 'register',
  loadComponent: () => RegisterPageComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
}];

import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { adminRoutes } from './admin/admin.routes';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { projectsRoutes } from './projects/projects.routes';

export const routes: Routes = [{
  path: '',
  loadComponent: () => LandingPageComponent
}, {
  path: 'auth',
  loadChildren: () => authRoutes
}, {
  path: 'admin',
  loadChildren: () => adminRoutes
}, {
  path: 'profile',
  loadChildren: () => profileRoutes
}, {
  path: 'projects',
  loadChildren: () => projectsRoutes
}];

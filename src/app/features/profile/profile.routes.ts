import { Route } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const profileRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent,
      ),
  },
  {
    path: 'obavestenja',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './pages/notifications-list-page/notifications-list-page.component'
      ).then((m) => m.NotificationsListPageComponent),
  },
];

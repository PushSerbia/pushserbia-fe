import { Route } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const profileRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile-page/profile-page').then((m) => m.ProfilePage),
  },
  {
    path: 'obavestenja',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/notifications-list-page/notifications-list-page').then(
        (m) => m.NotificationsListPage,
      ),
  },
];

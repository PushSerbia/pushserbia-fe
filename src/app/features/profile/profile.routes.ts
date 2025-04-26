import { Route } from '@angular/router';

export const profileRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent,
      ),
  },
  {
    path: 'obavestenja',
    loadComponent: () =>
      import(
        './pages/notifications-list-page/notifications-list-page.component'
      ).then((m) => m.NotificationsListPageComponent),
  },
];

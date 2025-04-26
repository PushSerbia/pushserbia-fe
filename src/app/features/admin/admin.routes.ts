import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: 'projekti',
    loadComponent: () =>
      import(
        './pages/admin-projects-list-page/admin-projects-list-page.component'
      ).then((m) => m.AdminProjectsListPageComponent),
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import(
        './pages/admin-project-details-page/admin-project-details-page.component'
      ).then((m) => m.AdminProjectDetailsPageComponent),
  },
  {
    path: 'korisnici',
    loadComponent: () =>
      import(
        './pages/admin-users-list-page/admin-users-list-page.component'
      ).then((m) => m.AdminUsersListPageComponent),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import(
        './pages/admin-user-details-page/admin-user-details-page.component'
      ).then((m) => m.AdminUserDetailsPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projekti',
  },
];

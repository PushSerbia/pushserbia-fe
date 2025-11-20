import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: 'projekti',
    loadComponent: () =>
      import(
        './admin-projects-list/admin-projects-list'
      ).then((m) => m.AdminProjectsList),
  },
  {
    path: 'projekti/:id',
    loadComponent: () =>
      import(
        './admin-project-details/admin-project-details'
      ).then((m) => m.AdminProjectDetails),
  },
  {
    path: 'korisnici',
    loadComponent: () =>
      import(
        './admin-users-list/admin-users-list'
      ).then((m) => m.AdminUsersList),
  },
  {
    path: 'korisnici/:id',
    loadComponent: () =>
      import(
        './admin-user-details/admin-user-details'
      ).then((m) => m.AdminUserDetails),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projekti',
  },
];

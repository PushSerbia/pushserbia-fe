import { Route } from '@angular/router';
import { AdminProjectsListPageComponent } from './pages/admin-projects-list-page/admin-projects-list-page.component';
import { AdminProjectDetailsPageComponent } from './pages/admin-project-details-page/admin-project-details-page.component';
import { AdminUsersListPageComponent } from './pages/admin-users-list-page/admin-users-list-page.component';
import { AdminUserDetailsPageComponent } from './pages/admin-user-details-page/admin-user-details-page.component';

export const adminRoutes: Route[] = [{
  path: 'projects',
  loadComponent: () => AdminProjectsListPageComponent
}, {
  path: 'projects/:id',
  loadComponent: () => AdminProjectDetailsPageComponent
}, {
  path: 'users',
  loadComponent: () => AdminUsersListPageComponent
}, {
  path: 'users/:id',
  loadComponent: () => AdminUserDetailsPageComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'projects'
}];

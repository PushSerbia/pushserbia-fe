import { Route } from '@angular/router';

export const projectsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/projects-list-page/projects-list-page').then(
        (m) => m.ProjectsListPage,
      ),
  },
  {
    path: 'novi',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/create-project-page/create-project-page').then(
        (m) => m.CreateProjectPage,
      ),
  },
  {
    path: ':slug/izmena',
    loadComponent: () =>
      import('./pages/create-project-page/create-project-page').then(
        (m) => m.CreateProjectPage,
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/project-details-page/project-details-page').then(
        (m) => m.ProjectDetailsPage,
      ),
  },
  {
    path: ':id/beleske-sastanka',
    loadComponent: () =>
      import(
        './pages/project-meeting-notes-page/project-meeting-notes-page'
      ).then((m) => m.ProjectMeetingNotesPage),
  },
];

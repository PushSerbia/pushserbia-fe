import { Route } from '@angular/router';
import { projectDetailsResolver } from './resolvers/project-details.resolver';

export const projectsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/projects-list-page/projects-list-page.component').then(
        (m) => m.ProjectsListPageComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-project-page/create-project-page.component').then(
        (m) => m.CreateProjectPageComponent
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import(
        './pages/project-details-page/project-details-page.component'
      ).then((m) => m.ProjectDetailsPageComponent),
    resolve: {
      project: projectDetailsResolver
    }
  },
  {
    path: ':id/meeting-notes',
    loadComponent: () =>
      import(
        './pages/project-meeting-notes-page/project-meeting-notes-page.component'
      ).then((m) => m.ProjectMeetingNotesPageComponent),
  },
];

import { Route } from '@angular/router';
import { ProjectsListPageComponent } from './pages/projects-list-page/projects-list-page.component';
import { CreateProjectPageComponent } from './pages/create-project-page/create-project-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { ProjectMeetingNotesPageComponent } from './pages/project-meeting-notes-page/project-meeting-notes-page.component';

export const projectsRoutes: Route[] = [{
  path: '',
  loadComponent: () => ProjectsListPageComponent
}, {
  path: 'create',
  loadComponent: () => CreateProjectPageComponent
}, {
  path: ':id',
  loadComponent: () => ProjectDetailsPageComponent
}, {
  path: ':id/meeting-notes',
  loadComponent: () => ProjectMeetingNotesPageComponent
}];

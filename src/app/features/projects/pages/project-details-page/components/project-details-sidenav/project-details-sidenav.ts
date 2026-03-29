import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../../../core/project/project';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { AuthRequired } from '../../../../../../core/auth/auth-required';

@Component({
  selector: 'app-project-details-sidenav',
  imports: [RouterLink, AuthRequired],
  templateUrl: './project-details-sidenav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsSidenav {
  project = input.required<Project>();
  currentUser = input.required<FirebaseUserData>();
}

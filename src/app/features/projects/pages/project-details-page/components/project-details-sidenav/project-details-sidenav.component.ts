import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../../../core/project/project';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { AuthRequiredDirective } from '../../../../../../core/auth/auth-required.directive';

@Component({
  selector: 'app-project-details-sidenav',
  imports: [RouterLink, AuthRequiredDirective],
  templateUrl: './project-details-sidenav.component.html',
  styleUrl: './project-details-sidenav.component.css',
})
export class ProjectDetailsSidenavComponent {
  project = input.required<Project>();
  currentUser = input.required<FirebaseUserData>();
}

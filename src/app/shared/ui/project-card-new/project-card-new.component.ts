import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRequiredDirective } from '../../../core/auth/auth-required.directive';

@Component({
  selector: 'app-project-card-new',
  imports: [RouterLink, AuthRequiredDirective],
  templateUrl: './project-card-new.component.html',
  styleUrl: './project-card-new.component.css',
})
export class ProjectCardNewComponent {}

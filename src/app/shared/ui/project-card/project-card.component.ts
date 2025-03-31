import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/project/project';

@Component({
  selector: 'app-project-card',
  imports: [
    RouterLink
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  project = input.required<Project>();
}

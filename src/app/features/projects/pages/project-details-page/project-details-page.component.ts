import { Component, input } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { Project } from '../../../../core/project/project';

@Component({
  selector: 'app-project-details-page',
  imports: [BasicLayoutComponent],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.scss'
})
export class ProjectDetailsPageComponent {
  readonly project = input.required<Project>();
}

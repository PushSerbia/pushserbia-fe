import { Component, inject, input } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectService } from '../../../../core/project/project.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-project-details-page',
  imports: [BasicLayoutComponent, LoadingSpinnerComponent],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.scss'
})
export class ProjectDetailsPageComponent {
  private readonly projectService = inject(ProjectService);
  readonly slug = input.required<string>();
  readonly projectDetailsResource = this.projectService.getProjectDetailsResource(this.slug);
}

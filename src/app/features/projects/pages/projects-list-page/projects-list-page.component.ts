import { Component, inject } from '@angular/core';
import { Project } from '../../../../core/project/project';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectService } from '../../../../core/project/project.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-projects-list-page',
  imports: [BasicLayoutComponent, ProjectCardComponent, LoadingSpinnerComponent],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss'
})
export class ProjectsListPageComponent {
  private readonly projectsService = inject(ProjectService);

  readonly projects = toSignal<Project[] | null>(this.projectsService.getAll(), { initialValue: null });
}

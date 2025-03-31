import { Component, effect, inject, signal } from '@angular/core';
import { Project } from '../../../../core/project/project';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectService } from '../../../../core/project/project.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-projects-list-page',
  imports: [BasicLayoutComponent, ProjectCardComponent, LoadingSpinnerComponent],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss'
})
export class ProjectsListPageComponent {
  private readonly projectsService = inject(ProjectService);

  readonly error = signal<string | null>(null);
  readonly projects = toSignal<Project[] | null>(
    this.projectsService.getAll()
      .pipe(catchError((error: Error) => {
        this.error.set(error.message || 'Greška prilikom dovlačenja projekata. Molimo pokušajte ponovo.');
        return of([]);
      })
    ), { initialValue: null });

  readonly page = signal<number>(1);

  readonly projectsResource = this.projectsService.getProjectsResource(this.page);
}

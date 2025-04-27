import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectCardNewComponent } from '../../../../shared/ui/project-card-new/project-card-new.component';
import { ProjectService } from '../../../../core/project/project.service';
import { Project } from '../../../../core/project/project';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, tap } from 'rxjs';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-landing-projects',
  imports: [
    RouterLink,
    ProjectCardComponent,
    ProjectCardNewComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './landing-projects.component.html',
  styleUrl: './landing-projects.component.css',
})
export class LandingProjectsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly destroyRef = inject(DestroyRef);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal<boolean>(true);

  readonly landingPageProjects = this.projectService
    .getAll({
      page: 1,
      pageSize: 2,
    })
    .pipe(
      tap(() => this.loading.set(true)),
      delay(1000),
      tap(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef),
    );

  ngOnInit(): void {
    this.landingPageProjects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((projects: any) => {
        this.projects.set(projects.data);
      });
  }
}

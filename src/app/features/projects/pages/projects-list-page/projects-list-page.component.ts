import {
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectListFiltersComponent } from './components/project-list-filters/project-list-filters.component';
import { ProjectListHeaderComponent } from './components/project-list-header/project-list-header.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { ProjectsFilter } from '../../../../core/project/projects-filter';
import { AuthService } from '../../../../core/auth/auth.service';
import { Project } from '../../../../core/project/project';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthRequiredDirective } from '../../../../core/auth/auth-required.directive';

@Component({
  selector: 'app-projects-list-page',
  imports: [
    BasicLayoutComponent,
    ProjectCardComponent,
    ProjectListFiltersComponent,
    ProjectListHeaderComponent,
    PageLoaderComponent,
    RouterLink,
    AuthRequiredDirective,
  ],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss',
})
export class ProjectsListPageComponent implements OnInit {
  public readonly projectStore = inject(ProjectStoreService);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly $loading = this.projectStore.$loading;
  readonly $filter = signal<ProjectsFilter>({ myProjectsOnly: false });
  readonly $projects = signal<Project[]>([]);
  readonly $currentUser = toSignal(this.authService.userData$);

  myProjectsOnly = input<string>('myProjectsOnly');

  ngOnInit(): void {
    if (this.myProjectsOnly()) {
      this.$filter.set({ myProjectsOnly: true });
    }

    effect(
      () => {
        const projects = this.projectStore.getAll()();
        const currentUser = this.$currentUser();
        if (!currentUser) {
          this.$projects.set(projects);
          return;
        }
        const filter = this.$filter();
        if (filter.myProjectsOnly) {
          const filteredProjects = projects.filter(
            (project) => project.creator.id === currentUser.id,
          );
          this.$projects.set(filteredProjects);
          return;
        }
        this.$projects.set(projects);
      },
      { injector: this.injector },
    );
  }

  onFilterUpdate(filter: ProjectsFilter): void {
    this.$filter.set(filter);

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: filter.myProjectsOnly ? { myProjectsOnly: true } : {},
    });
  }
}

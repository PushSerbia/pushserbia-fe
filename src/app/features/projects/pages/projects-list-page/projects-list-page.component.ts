import { Component, effect, inject, Injector, OnInit, signal } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-list-page',
  imports: [BasicLayoutComponent, ProjectCardComponent, ProjectListFiltersComponent, ProjectListHeaderComponent, PageLoaderComponent, RouterLink],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss'
})
export class ProjectsListPageComponent implements OnInit {
  public readonly projectStore = inject(ProjectStoreService);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);

  readonly $loading = this.projectStore.$loading;
  readonly $filter = signal<ProjectsFilter>({myProjectsOnly: false});
  readonly $projects = signal<Project[]>([]);
  readonly $currentUser = toSignal(this.authService.userData$);

  ngOnInit(): void {
    effect(() => {
      const projects = this.projectStore.getAll()();
      const currentUser = this.$currentUser();
      if (!currentUser) {
        this.$projects.set(projects);
        return;
      }
      const filter = this.$filter();
      if (filter.myProjectsOnly) {
        const filteredProjects = projects.filter((project) => project.creator.id === currentUser.id);
        this.$projects.set(filteredProjects);
        return;
      }
      this.$projects.set(projects);
    }, {injector: this.injector});
  }

  onFilterUpdate(filter: ProjectsFilter): void {
    this.$filter.set(filter);
  }
}

import { Component, inject } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectListFiltersComponent } from './components/project-list-filters/project-list-filters.component';
import { ProjectListHeaderComponent } from './components/project-list-header/project-list-header.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';

@Component({
  selector: 'app-projects-list-page',
  imports: [BasicLayoutComponent, ProjectCardComponent, ProjectListFiltersComponent, ProjectListHeaderComponent, PageLoaderComponent],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss'
})
export class ProjectsListPageComponent {
  public readonly projectStore = inject(ProjectStoreService);

  readonly $loading = this.projectStore.$loading;
  readonly $projects = this.projectStore.getAll();
}

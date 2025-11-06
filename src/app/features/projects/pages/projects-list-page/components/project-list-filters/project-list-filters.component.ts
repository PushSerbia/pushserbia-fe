import { Component, input, output } from '@angular/core';
import { ProjectsFilter } from '../../../../../../core/project/projects-filter';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-list-filters',
  imports: [TranslateModule],
  templateUrl: './project-list-filters.component.html',
  styleUrl: './project-list-filters.component.css',
})
export class ProjectListFiltersComponent {
  state = input<ProjectsFilter>();
  updated = output<ProjectsFilter>();
}

import { Component, input, output } from '@angular/core';
import { ProjectsFilter } from '../../../../../../core/project/projects-filter';

@Component({
  selector: 'app-project-list-filters',
  imports: [],
  templateUrl: './project-list-filters.html',
  styleUrl: './project-list-filters.css',
})
export class ProjectListFilters {
  state = input<ProjectsFilter>();
  updated = output<ProjectsFilter>();
}

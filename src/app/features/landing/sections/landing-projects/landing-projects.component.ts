import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/project/project';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectCardNewComponent } from '../../../../shared/ui/project-card-new/project-card-new.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-landing-projects',
  imports: [
    RouterLink,
    ProjectCardComponent,
    ProjectCardNewComponent,
    SlicePipe,
  ],
  templateUrl: './landing-projects.component.html',
  styleUrl: './landing-projects.component.css',
})
export class LandingProjectsComponent {
  allProjects: Signal<Project[]>;

  constructor(private projectStoreService: ProjectStoreService) {
    this.allProjects = this.projectStoreService.getAll();
  }
}

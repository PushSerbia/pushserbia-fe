import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/project/project';
import { TransitionService } from '../../../core/transition/transition.service';

@Component({
  selector: 'app-project-card',
  imports: [
    RouterLink
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  project = input.required<Project>();

  transitionService = inject(TransitionService);

  viewTransitionName(project: Project): string {
    const transition = this.transitionService.current();

    const fromSlug = transition?.to.firstChild?.firstChild?.params['slug'];
    const toSlug = transition?.from.firstChild?.firstChild?.params['slug'];

    const isBannerImg = toSlug === project.slug || fromSlug === project.slug;
    return isBannerImg ? 'project-img' : '';
  }
}

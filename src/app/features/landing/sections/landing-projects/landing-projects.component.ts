import { Component, effect, inject, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/project/project';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { ProjectCardNewComponent } from '../../../../shared/ui/project-card-new/project-card-new.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { SlicePipe } from '@angular/common';
import {
  VoteState,
  VoteStoreService,
} from '../../../../core/vote/vote.store.service';
import { TransitionService } from '../../../../core/transition/transition.service';

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
  $allProjects: Signal<Project[]>;
  $votesMap = signal<VoteState>({});
  private transitionService = inject(TransitionService);

  constructor(
    private projectStoreService: ProjectStoreService,
    private voteStoreService: VoteStoreService,
  ) {
    this.$allProjects = this.projectStoreService.getAll();
    effect(() => {
      const votesMap = this.voteStoreService.getAll();
      this.$votesMap.set(votesMap());
    });
  }

  viewTransitionName(project: Project): string {
    const transition = this.transitionService.current();

    const fromSlug = transition?.to.firstChild?.firstChild?.params['slug'];
    const toSlug = transition?.from.firstChild?.firstChild?.params['slug'];

    const isBannerImg = toSlug === project.slug || fromSlug === project.slug;
    return isBannerImg ? 'project-img' : '';
  }
}

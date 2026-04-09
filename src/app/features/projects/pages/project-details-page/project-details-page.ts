import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { BasicLayout } from '../../../../shared/layout/landing-layout/basic-layout';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/project/project';
import { ProjectDetailsSidenav } from './components/project-details-sidenav/project-details-sidenav';
import { ProjectStore } from '../../../../core/project/project-store';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { VoteStore } from '../../../../core/vote/vote-store';
import { AuthClient } from '../../../../core/auth/auth-client';

import { AuthRequired } from '../../../../core/auth/auth-required';
import { GravatarModule } from 'ngx-gravatar';
import { UnsplashUrlFormatter } from '../../../../shared/unsplash-url-formatter';
import { SeoManager } from '../../../../core/seo/seo-manager';
import { ProjectTeamSection } from './components/project-team-section/project-team-section';

@Component({
  selector: 'app-project-details-page',
  imports: [
    BasicLayout,
    QuillViewHTMLComponent,
    RouterLink,
    ProjectDetailsSidenav,
    PageLoader,
    AuthRequired,
    GravatarModule,
    UnsplashUrlFormatter,
    ProjectTeamSection,
  ],
  templateUrl: './project-details-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsPage implements OnInit {
  public readonly projectStore = inject(ProjectStore);
  public readonly voteStore = inject(VoteStore);
  private readonly authService = inject(AuthClient);
  private readonly injector = inject(Injector);
  private readonly seo = inject(SeoManager);

  readonly slug = input.required<string>();

  $projectLoading = this.projectStore.$loading;
  $project?: Signal<Project>;

  $voteLoading = this.voteStore.$loading;
  $voted?: Signal<boolean>;

  $currentUser = this.authService.$userData;

  ngOnInit(): void {
    this.$project = this.projectStore.getBySlug(this.slug());

    effect(
      () => {
        const project = this.$project?.();
        if (project?.id) {
          this.$voted = this.voteStore.isVoted(project.id);
          this.seo.update({
            title: project.name,
            description: project.shortDescription,
            image: project.image,
            jsonLd: {
              '@type': 'CreativeWork',
              name: project.name,
              description: project.shortDescription,
              image: project.image,
              url: `https://pushserbia.com/projekti/${project.slug}`,
              dateCreated: project.createdAt,
              dateModified: project.updatedAt,
              author: {
                '@type': 'Person',
                name: project.creator.fullName,
              },
            },
          });
        }
      },
      { injector: this.injector },
    );
  }

  voteForProject(project: Project): void {
    this.voteStore.create(project.id).subscribe((vote) => {
      this.projectStore.updateStateBySlug(project.slug, {
        ...project,
        totalVoters: project.totalVoters + 1,
        totalVotes: project.totalVotes + vote.weight,
      });
    });
  }
}

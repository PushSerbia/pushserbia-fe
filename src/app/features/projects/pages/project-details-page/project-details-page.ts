import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  RESPONSE_INIT,
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
import { OnboardingService } from '../../../../core/onboarding/onboarding';

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
  private readonly onboarding = inject(OnboardingService);
  private readonly response = inject(RESPONSE_INIT, { optional: true });

  readonly slug = input.required<string>();

  $projectLoading = this.projectStore.$loading;
  $project?: Signal<Project>;

  $voteLoading = this.voteStore.$loading;
  $voted?: Signal<boolean>;

  $currentUser = this.authService.$userData;

  // Up to three other projects, surfaced as dofollow internal links so each
  // project receives inbound links from its siblings — not only the single
  // link from the /projekti listing page.
  private readonly $allProjects = this.projectStore.getAll();
  readonly $relatedProjects = computed<Project[]>(() => {
    const current = this.$project?.();
    return this.$allProjects()
      .filter((project) => project?.slug && project.slug !== current?.slug)
      .slice(0, 3);
  });

  ngOnInit(): void {
    this.$project = this.projectStore.getBySlug(this.slug());

    if (this.authService.$authenticated()) {
      this.onboarding.markFirstProjectView();
    }

    effect(
      () => {
        const project = this.$project?.();
        const loading = this.$projectLoading();
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
        } else if (!loading) {
          // Finished loading with no match → unknown/removed slug. Serve a real
          // 404 (+ noindex) instead of a soft-404 (200 with a "not found" view).
          this.seo.update({
            title: 'Projekat nije pronađen',
            description: 'Traženi projekat ne postoji ili je uklonjen.',
            robots: 'noindex, nofollow',
          });
          if (this.response) {
            this.response.status = 404;
          }
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
      this.onboarding.markFirstVote();
    });
  }
}

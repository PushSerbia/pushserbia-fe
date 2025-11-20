import {
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
import { Project } from '../../../../core/project/project';
import { ProjectDetailsSidenav } from './components/project-details-sidenav/project-details-sidenav';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { VoteStoreService } from '../../../../core/vote/vote.store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { AuthRequiredDirective } from '../../../../core/auth/auth-required.directive';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'app-project-details-page',
  imports: [
    BasicLayout,
    QuillViewHTMLComponent,
    ProjectDetailsSidenav,
    PageLoader,
    AsyncPipe,
    AuthRequiredDirective,
    GravatarModule,
  ],
  templateUrl: './project-details-page.html',
  styleUrl: './project-details-page.scss',
})
export class ProjectDetailsPage implements OnInit {
  public readonly projectStore = inject(ProjectStoreService);
  public readonly voteStore = inject(VoteStoreService);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);

  readonly slug = input.required<string>();

  $projectLoading = this.projectStore.$loading;
  $project?: Signal<Project>;

  $voteLoading = this.voteStore.$loading;
  $voted?: Signal<boolean>;

  currentUser$ = this.authService.userData$;

  ngOnInit(): void {
    this.$project = this.projectStore.getBySlug(this.slug());

    effect(
      () => {
        const project = this.$project?.();
        if (project?.id) {
          this.$voted = this.voteStore.isVoted(project.id);
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

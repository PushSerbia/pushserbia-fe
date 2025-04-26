import {
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { Project } from '../../../../core/project/project';
import { ProjectDetailsSidenavComponent } from './components/project-details-sidenav/project-details-sidenav.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { VoteStoreService } from '../../../../core/vote/vote.store.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-details-page',
  imports: [
    BasicLayoutComponent,
    QuillViewHTMLComponent,
    ProjectDetailsSidenavComponent,
    PageLoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.scss',
})
export class ProjectDetailsPageComponent implements OnInit {
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

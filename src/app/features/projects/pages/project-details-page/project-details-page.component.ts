import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { VoteService } from '../../../../core/vote/vote.service';
import { Project } from '../../../../core/project/project';
import { ProjectDetailsSidenavComponent } from './components/project-details-sidenav/project-details-sidenav.component';
import { ProjectStoreService } from '../../../../core/project/project.store.service';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';

@Component({
  selector: 'app-project-details-page',
  imports: [BasicLayoutComponent, QuillViewHTMLComponent, ProjectDetailsSidenavComponent, PageLoaderComponent],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.scss'
})
export class ProjectDetailsPageComponent implements OnInit {
  public readonly projectStore = inject(ProjectStoreService);
  private readonly voteService = inject(VoteService);

  readonly slug = input.required<string>();

  $loading = this.projectStore.$loading;
  $project?: Signal<Project>;

  ngOnInit(): void {
    this.$project = this.projectStore.getBySlug(this.slug());
  }

  voteForProject(project: Project): void {
    this.voteService.create({ projectId: project.id })
      .subscribe(() => {
        console.log('Thank you!');
        // router.navigate([???]);

        this.projectStore.updateStateBySlug(project.slug, {
          ...project,
          totalVoters: project.totalVoters + 1,
        });
      });
  }
}

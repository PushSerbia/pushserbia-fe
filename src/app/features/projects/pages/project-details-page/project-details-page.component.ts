import { Component, computed, inject, input } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { ProjectService } from '../../../../core/project/project.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { AlertMessageComponent } from '../../../../shared/ui/alert-message/alert-message.component';
import { VoteService } from '../../../../core/vote/vote.service';

@Component({
  selector: 'app-project-details-page',
  imports: [BasicLayoutComponent, LoadingSpinnerComponent, AlertMessageComponent],
  templateUrl: './project-details-page.component.html',
  styleUrl: './project-details-page.component.scss'
})
export class ProjectDetailsPageComponent {
  private readonly projectService = inject(ProjectService);
  private readonly voteService = inject(VoteService);
  readonly slug = input.required<string>();
  readonly projectDetailsResource = this.projectService.getProjectDetailsResource(this.slug);

  readonly error = computed<string>(() => {
    const error = this.projectDetailsResource.error();
    if (error instanceof Error) {
      return error.message;
    }
    else {
      return '';
    }
  });

  voteForProject() {
    this.voteService.voteForProject(this.projectDetailsResource.value()!.id)
      .subscribe(() => {
        alert('Thank you!');
        // router.navigate([???]);
      })
  }
}

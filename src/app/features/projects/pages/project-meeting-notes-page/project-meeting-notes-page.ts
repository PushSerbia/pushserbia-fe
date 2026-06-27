import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoManager } from '../../../../core/seo/seo-manager';

@Component({
  selector: 'app-project-meeting-notes-page',
  imports: [],
  templateUrl: './project-meeting-notes-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMeetingNotesPage {
  private readonly seo = inject(SeoManager);

  constructor() {
    // Unfinished, project-internal page — keep it out of search results.
    this.seo.update({ title: 'Beleške sa sastanka', robots: 'noindex, nofollow' });
  }
}

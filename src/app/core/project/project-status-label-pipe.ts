import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from './project-status';

/** Serbian labels for the English `ProjectStatus` enum values shown in the UI. */
export const PROJECT_STATUS_LABELS: Record<string, string> = {
  [ProjectStatus.Pending]: 'Na čekanju',
  [ProjectStatus.Voting]: 'Glasanje',
  [ProjectStatus.InProgress]: 'U razvoju',
  [ProjectStatus.Maintenance]: 'Održavanje',
  [ProjectStatus.Closed]: 'Završen',
  [ProjectStatus.Declined]: 'Odbijen',
};

@Pipe({ name: 'projectStatusLabel' })
export class ProjectStatusLabelPipe implements PipeTransform {
  transform(status: ProjectStatus | string | null | undefined): string {
    if (!status) {
      return '';
    }
    return PROJECT_STATUS_LABELS[status] ?? status;
  }
}

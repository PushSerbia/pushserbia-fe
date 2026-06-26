import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthClient } from '../../../core/auth/auth-client';

@Component({
  selector: 'app-project-card-new',
  imports: [RouterLink],
  templateUrl: './project-card-new.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardNew {
  private readonly authService = inject(AuthClient);

  // Link straight to the final destination based on auth state so crawlers
  // (always unauthenticated) get a direct link to the login page instead of
  // following /projekti/novi through an auth-guard redirect.
  readonly $authenticated = this.authService.$authenticated;
}

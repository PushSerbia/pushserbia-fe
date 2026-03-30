import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthClient } from '../../../core/auth/auth-client';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink, GravatarModule],
  templateUrl: './user-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserWidget {
  private authService = inject(AuthClient);

  $userData = this.authService.$userData;

  onLogoutClick(): void {
    this.authService.signOut().subscribe();
  }
}

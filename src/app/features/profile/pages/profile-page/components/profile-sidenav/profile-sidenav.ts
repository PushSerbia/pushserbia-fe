import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthClient } from '../../../../../../core/auth/auth-client';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-sidenav',
  imports: [RouterLink],
  templateUrl: './profile-sidenav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSidenav {
  private authService = inject(AuthClient);
  private router = inject(Router);

  onLogoutClick(): void {
    this.authService
      .signOut()
      .pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-sidenav',
  imports: [RouterLink],
  templateUrl: './profile-sidenav.html',
  styleUrl: './profile-sidenav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSidenav {
  private authService = inject(AuthService);
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

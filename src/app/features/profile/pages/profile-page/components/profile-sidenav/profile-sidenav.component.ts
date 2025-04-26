import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-sidenav',
  imports: [RouterLink],
  templateUrl: './profile-sidenav.component.html',
  styleUrl: './profile-sidenav.component.css',
})
export class ProfileSidenavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogoutClick(): void {
    this.authService.signOut().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}

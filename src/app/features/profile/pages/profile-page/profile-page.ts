import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { BasicLayout } from '../../../../shared/layout/landing-layout/basic-layout';
import { AuthClient } from '../../../../core/auth/auth-client';
import { ProfileSidenav } from './components/profile-sidenav/profile-sidenav';
import { PageLoader } from '../../../../shared/ui/page-loader/page-loader';
import { ProfileStats } from './components/profile-stats/profile-stats';
import { ProfileDetails } from './components/profile-details/profile-details';
import { ProfileFeedback } from './components/profile-feedback/profile-feedback';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [BasicLayout, ProfileSidenav, PageLoader, ProfileStats, ProfileDetails, ProfileFeedback],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly authService = inject(AuthClient);
  private readonly router = inject(Router);

  $data = this.authService.$fullUserData;

  constructor() {
    this.authService.getMe().subscribe();
    effect(() => {
      const authenticated = this.authService.$authenticated();
      if (authenticated === false) {
        this.router.navigate(['/']);
      }
    });
  }
}

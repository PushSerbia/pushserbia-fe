import { Component, effect, inject } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { ProfileSidenavComponent } from './components/profile-sidenav/profile-sidenav.component';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  imports: [
    BasicLayoutComponent,
    ProfileSidenavComponent,
    PageLoaderComponent,
    ProfileStatsComponent,
    ProfileDetailsComponent,
    TranslatePipe,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);
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

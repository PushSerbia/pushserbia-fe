import { Component, effect, inject } from '@angular/core';
import { BasicLayoutComponent } from '../../../../shared/layout/landing-layout/basic-layout.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { combineLatest, first, map, Observable } from 'rxjs';
import { ProfileSidenavComponent } from './components/profile-sidenav/profile-sidenav.component';
import { PageLoaderComponent } from '../../../../shared/ui/page-loader/page-loader.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { User } from '../../../../core/user/user';
import { FirebaseUserData } from '../../../../core/user/firebase-user-data';
import { ProfileFeedbackComponent } from './components/profile-feedback/profile-feedback.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [
    BasicLayoutComponent,
    AsyncPipe,
    ProfileSidenavComponent,
    PageLoaderComponent,
    ProfileStatsComponent,
    ProfileFeedbackComponent,
    ProfileDetailsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  data$: Observable<User & FirebaseUserData> = combineLatest([
    this.authService.userData$.pipe(first()),
    this.authService.getMe(),
  ]).pipe(
    map(
      ([userData, me]) =>
        ({
          ...me,
          ...userData,
          imageUrl: me.imageUrl || userData?.imageUrl,
        }) as User & FirebaseUserData,
    ),
  );

  constructor() {
    effect(() => {
      const authenticated = this.authService.authenticated$();
      if (authenticated === false) {
        this.router.navigate(['/']);
      }
    })
  }
}

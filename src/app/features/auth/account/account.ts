import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { AuthClient } from '../../../core/auth/auth-client';
import { OnboardingService } from '../../../core/onboarding/onboarding';
import { first } from 'rxjs';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthClient);
  private dialog = inject(Dialog);
  private onboarding = inject(OnboardingService);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const customToken = this.route.snapshot.queryParams['customToken'];

    this.authService
      .signInWithCustomToken(customToken)
      .pipe(first())
      .subscribe(() => {
        const userId = this.authService.$userData()?.id;
        if (userId) {
          this.onboarding.loadForUser(userId);
        }

        if (this.onboarding.shouldShowWelcome()) {
          this.router.navigateByUrl('/').then(() => {
            import('../../../shared/ui/onboarding-wizard/onboarding-wizard').then((m) => {
              this.dialog.open(m.OnboardingWizard, {
                width: '480px',
                disableClose: true,
                backdropClass: 'bg-black/80',
              });
            });
          });
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }
}

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AuthClient } from '../../../../core/auth/auth-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-list-page',
  imports: [],
  templateUrl: './notifications-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListPage {
  private readonly authService = inject(AuthClient);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      const authenticated = this.authService.$authenticated();
      if (authenticated === false) {
        this.router.navigate(['/']);
      }
    });
  }
}

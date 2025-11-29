import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-list-page',
  imports: [],
  templateUrl: './notifications-list-page.html',
  styleUrl: './notifications-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListPage {
  private readonly authService = inject(AuthService);
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

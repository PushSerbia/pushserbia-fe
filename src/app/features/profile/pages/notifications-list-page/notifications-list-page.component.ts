import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-list-page',
  imports: [],
  templateUrl: './notifications-list-page.component.html',
  styleUrl: './notifications-list-page.component.scss',
})
export class NotificationsListPageComponent {
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

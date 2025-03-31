import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-user-widget',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css'
})
export class UserWidgetComponent {
  private authService = inject(AuthService);

  user$ = this.authService.userData$;

  onLogoutClick(): void {
    this.authService.signOut().subscribe();
  }
}

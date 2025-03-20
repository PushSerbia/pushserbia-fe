import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent {
  private authService = inject(AuthService);

  user$ = this.authService.userData$;

  onLogoutClick(): void {
    this.authService.signOut().subscribe();
  }
}

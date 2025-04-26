import { Directive, HostListener, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAuthRequired]',
})
export class AuthRequiredDirective {
  private authService = inject(AuthService);
  private router = inject(Router);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.authService.authenticated$()) {
      event.preventDefault();
      event.stopPropagation();
      this.router.navigate(['/auth/login']);
    }
  }
}

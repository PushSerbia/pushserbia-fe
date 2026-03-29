import { Directive, HostListener, inject } from '@angular/core';
import { AuthClient } from '../../core/auth/auth-client';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAuthRequired]',
})
export class AuthRequired {
  private authService = inject(AuthClient);
  private router = inject(Router);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (!this.authService.$authenticated()) {
      event.preventDefault();
      event.stopPropagation();
      this.router.navigate(['/autentikacija/prijava']);
    }
  }
}

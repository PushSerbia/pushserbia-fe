import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthClient } from './auth-client';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthClient);
  const router = inject(Router);

  if (authService.$authenticated()) {
    return true;
  }

  return router.parseUrl('/autentikacija/prijava');
};

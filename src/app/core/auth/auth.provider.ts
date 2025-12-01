import { EnvironmentProviders, inject, provideAppInitializer, Provider } from '@angular/core';
import { AuthService } from './auth.service';

export const provideAuth = (): (Provider | EnvironmentProviders)[] => {
  return [
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.initialize();
    }),
  ];
};

import { EnvironmentProviders, inject, provideAppInitializer, Provider } from '@angular/core';
import { AuthClient } from './auth-client';

export const provideAuth = (): (Provider | EnvironmentProviders)[] => {
  return [
    provideAppInitializer(() => {
      const authService = inject(AuthClient);
      return authService.initialize();
    }),
  ];
};

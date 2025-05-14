import { APP_INITIALIZER, Provider } from '@angular/core';
import { GoogleTagManagerService } from './gtm.service';

/**
 * Factory function to initialize the Google Tag Manager service
 */
export function initializeGtm(gtmService: GoogleTagManagerService) {
  return () => {
    gtmService.initialize();
  };
}

/**
 * Provider for Google Tag Manager service
 * This ensures the GTM service is initialized when the application starts
 */
export function provideGtm(): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGtm,
      deps: [GoogleTagManagerService],
      multi: true,
    },
  ];
}

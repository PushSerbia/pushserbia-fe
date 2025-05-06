import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  PLATFORM_ID,
  Provider,
  REQUEST,
} from '@angular/core';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  initializeApp,
  initializeServerApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CONFIG, DEBUG_MODE } from '@angular/fire/compat/analytics';
import { environment } from '../../../environments/environment';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { isPlatformBrowser } from '@angular/common';

export const provideFirebase = (): (Provider | EnvironmentProviders)[] => {
  return [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase,
    },
    {
      provide: CONFIG,
      useValue: {
        send_page_view: true,
      },
    },
    {
      provide: DEBUG_MODE,
      useValue: !environment.production,
    },
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(environment.firebase);
      }
      const request = inject(REQUEST, { optional: true });
      const cookies = request?.headers.get('cookie');
      let cookieToken;
      if (cookies) {
        const tokenCookie = cookies
          .split(';')
          .find((c) => c.trim().startsWith('__auth='));
        if (tokenCookie) {
          cookieToken = tokenCookie.split('=')[1];
        }
      }
      const app = initializeApp(environment.firebase);
      return initializeServerApp(app, {
        authIdToken: cookieToken,
        releaseOnDeref: request || undefined,
      });
    }),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    providePerformance(() => getPerformance()),
    importProvidersFrom([ScreenTrackingService, UserTrackingService]),
  ];
};

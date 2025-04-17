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
  FirebaseApp,
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
      // Optional, since it's null in dev-mode and SSG
      const request = inject(REQUEST, { optional: true });
      const authIdToken = request?.headers
        .get('authorization')
        ?.split('Bearer ')[1];
      return initializeServerApp(environment.firebase, {
        authIdToken,
        releaseOnDeref: request || undefined,
      });
    }),
    provideAuth(() => getAuth(inject(FirebaseApp))),
    provideAnalytics(() => getAnalytics()),
    providePerformance(() => getPerformance()),
    importProvidersFrom([ScreenTrackingService, UserTrackingService]),
  ];
};

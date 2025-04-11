import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, inject, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  Router,
  ViewTransitionInfo,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';
import * as Sentry from '@sentry/angular';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideFirebase } from './core/firebase/firebase.provider';
import { authInterceptor } from './core/auth/auth.interceptor';
import { apiInterceptor } from './core/api/api.interceptor';
import { provideApiEndpointUrl } from './core/providers/api-endpoint-url.provider';
import { environment } from '../environments/environment';
import { provideQuillConfig } from 'ngx-quill';
import { TransitionService } from './core/transition/transition.service';

function onViewTransitionCreated(info: ViewTransitionInfo) {
  const router = inject(Router);
  const toUrl = router.getCurrentNavigation()?.finalUrl?.toString() ?? '';

  if (!toUrl.startsWith('/projects') || toUrl === '/projects/new') {
    info.transition.skipTransition();
    return;
  }

  const currentTransitionService = inject(TransitionService);
  currentTransitionService.current.set(info)

  info.transition.finished.finally(() => {
    currentTransitionService.current.set(null);
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions({ skipInitialTransition: true, onViewTransitionCreated })
    ),
    provideApiEndpointUrl(environment.apiUrl),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor, authInterceptor])),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    // todo: https://docs.sentry.io/platforms/javascript/guides/angular/sourcemaps/
    provideFirebase(),
    provideQuillConfig({
      modules: {
        // syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          // [{ 'font': [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'], // link and image, video
        ],
      },
    }),
  ]
};

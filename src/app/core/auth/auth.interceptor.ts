import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

function handleBrowserRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
): Observable<HttpEvent<unknown>> {
  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.signOut().pipe(
          switchMap(() => {
            router.navigateByUrl('/');
            return throwError(() => error);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
}

function handleServerRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const newReq = req.clone({ withCredentials: true, headers: req.headers });

  try {
    const request = inject(REQUEST, { optional: true });

    const headers = newReq.headers.set(
      'cookie',
      request?.headers?.get('cookie') as string,
    );
    return next(newReq.clone({ headers }));
  } catch {
    return next(newReq);
  }
}

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    return handleBrowserRequest(req, next, authService, router);
  }

  return handleServerRequest(req, next);
};

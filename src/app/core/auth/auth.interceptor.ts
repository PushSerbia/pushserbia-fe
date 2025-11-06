import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

function handleBrowserRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
): Observable<HttpEvent<unknown>> {
  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.signOut();
        location.reload();
      }
      return throwError(error);
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

  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    return handleBrowserRequest(req, next, authService);
  }

  return handleServerRequest(req, next);
};

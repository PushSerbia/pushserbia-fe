import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUtils } from './auth.utils';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const angularFireAuth = inject(AngularFireAuth);

  let newReq = req.clone();

  return from(angularFireAuth.idToken).pipe(
    switchMap((token: string | null) => {
      if (!token) {
        return next(newReq);
      }
      if (token && !AuthUtils.isTokenExpired(token)) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
      }
      return next(newReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            authService.signOut();
            location.reload();
          }

          return throwError(error);
        }),
      );
    }),
  );
};

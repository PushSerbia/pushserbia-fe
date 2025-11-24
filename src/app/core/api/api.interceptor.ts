import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    const url = `${environment.apiUrl}${req.url}`;

    req = req.clone({
      url,
    });
  }

  return next(req);
};

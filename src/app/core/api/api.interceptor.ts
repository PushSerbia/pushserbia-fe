import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_ENDPOINT_URL } from '../providers/api-endpoint-url.provider';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const API_URL = inject(API_ENDPOINT_URL);
  if (!req.url.startsWith('http') && !req.url.endsWith('.json')) {
    const url = `${API_URL}${req.url}`;

    req = req.clone({
      url,
    });
  }

  return next(req);
};

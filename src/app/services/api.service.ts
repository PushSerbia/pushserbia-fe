import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINT_URL } from '../providers/api-endpoint-url.provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly endpoint = inject(API_ENDPOINT_URL);
  private readonly http = inject(HttpClient);

  get<T = unknown>(path: string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${path}`);
  }

  post<T = unknown, G = unknown>(path: string, body: G): Observable<T> {
    return this.http.post<T>(`${this.endpoint}/${path}`, body);
  }
}

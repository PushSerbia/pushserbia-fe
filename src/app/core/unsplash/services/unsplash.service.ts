import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService extends ApiService<unknown> {
  protected override endpoint = 'unsplash';

  private readonly http = inject(HttpClient);

  searchPhotos(query: string): Observable<unknown> {
    return this.http.get<unknown>(`${this.endpoint}/search`, {
      params: { query },
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UnsplashPhoto, UnsplashSearchResponse } from '../interfaces/unsplash-photo.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private httpClient = inject(HttpClient);
  private endpoint = 'unsplash';

  searchPhotos(query: string): Observable<UnsplashPhoto[]> {
    return this.httpClient
      .get<UnsplashSearchResponse>(`/${this.endpoint}/search`, {
        params: { query },
      })
      .pipe(map(this.mapSearchResponseToResults.bind(this)));
  }

  private mapSearchResponseToResults(response: UnsplashSearchResponse): UnsplashPhoto[] {
    return response.results;
  }
}

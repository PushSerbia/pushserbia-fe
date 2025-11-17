import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { map, Observable } from 'rxjs';
import { UnsplashPhoto, UnsplashSearchResponse } from '../interfaces/unsplash-photo.interface';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService extends ApiService<UnsplashPhoto> {
  protected override endpoint = 'unsplash';

  searchPhotos(query: string): Observable<UnsplashPhoto[]> {
    return this.httpClient.get<UnsplashSearchResponse>(`${this.endpoint}/search`, {
      params: { query },
    })
    .pipe(
      map(this.mapSearchResponseToResults.bind(this))
    );
  }

  private mapSearchResponseToResults(response: UnsplashSearchResponse): UnsplashPhoto[] {
    return response.results;
  }
}

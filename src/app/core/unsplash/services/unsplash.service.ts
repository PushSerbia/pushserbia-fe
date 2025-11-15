import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface UnsplashPhoto {
  id: string;
  slug: string;
  alternative_slugs: Record<string, string>;
  created_at: string;   // ISO timestamp
  updated_at: string;   // ISO timestamp
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  breadcrumbs: unknown[];  // unknown structure in your sample
  urls: UnsplashUrls;
  links: UnsplashLinks;
  likes: number;
  liked_by_user: boolean;
  bookmarked: boolean;
  current_user_collections: unknown[];
  sponsorship: unknown | null;
  topic_submissions: Record<string, unknown>;
  asset_type: string;
  premium: boolean;
  plus: boolean;
  user: UnsplashUser;
  search_source: string;
}

export interface UnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface UnsplashLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface UnsplashUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  links: UnsplashUserLinks;
  profile_image: UnsplashProfileImage;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: UnsplashUserSocial;
}

export interface UnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

export interface UnsplashProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UnsplashUserSocial {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
}



@Injectable({
  providedIn: 'root',
})
export class UnsplashService extends ApiService<unknown> {
  protected override endpoint = 'unsplash';

  private readonly http = inject(HttpClient);

  searchPhotos(query: string): Observable<UnsplashSearchResponse> {
    return this.http.get<UnsplashSearchResponse>(`${this.endpoint}/search`, {
      params: { query },
    });
  }
}

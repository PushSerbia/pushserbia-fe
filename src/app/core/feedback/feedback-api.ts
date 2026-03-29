import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackApi extends ApiClient<Feedback> {
  readonly endpoint = 'feedback';
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends ApiService<Feedback> {
  readonly endpoint = 'feedback';
}

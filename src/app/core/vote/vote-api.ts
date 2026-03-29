import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { Vote } from './vote';

@Injectable({
  providedIn: 'root',
})
export class VoteApi extends ApiClient<Vote> {
  readonly endpoint = 'votes';

  getMyVotes() {
    return super.getById<Vote[]>('my-votes');
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Vote } from './vote';

@Injectable({
  providedIn: 'root',
})
export class VoteService extends ApiService<Vote> {
  readonly endpoint = 'votes';

  getMyVotes() {
    return super.getById<Vote[]>('my-votes');
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService extends ApiService<any>{
  readonly endpoint = 'votes';

  voteForProject(projectId: string) {
    return super.set(projectId, {});
  }
}

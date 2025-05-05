import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from './user';
import { UpdateMePayload } from './interfaces/update-me-payload.interface';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService<User> {
  protected endpoint = 'users';

  private readonly me$ = this.getById('me').pipe(shareReplay(1));

  createAccount(params: Partial<User>) {
    return this.httpClient.post<User>(`/${this.endpoint}/account`, params);
  }

  getMe(): Observable<User> {
    return this.me$;
  }

  updateMe(payload: UpdateMePayload) {
    return this.update('me', payload);
  }
}

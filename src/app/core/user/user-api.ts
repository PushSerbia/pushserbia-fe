import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { User } from './user';
import { UpdateMePayload } from './interfaces/update-me-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApi extends ApiClient<User> {
  protected endpoint = 'users';

  createAccount(params: Partial<User>) {
    return this.httpClient.post<User>(`/${this.endpoint}/account`, params);
  }

  getMe(): Observable<User> {
    return this.getById('me');
  }

  updateMe(payload: UpdateMePayload) {
    return this.update('me', payload);
  }
}

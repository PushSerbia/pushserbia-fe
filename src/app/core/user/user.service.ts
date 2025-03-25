import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService<User> {
  protected endpoint = 'users';

  createAccount(params: Partial<User>) {
    return this.httpClient.post<User>(`/${this.endpoint}/account`, params);
  }
}

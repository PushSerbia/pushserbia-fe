import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SubscriptionData {
  email: string;
  tags: string;
  name?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  private apiUrl = `${environment.apiUrl}/integrations`;

  constructor(private httpClient: HttpClient) {}

  private subscribe(data: SubscriptionData) {
    return this.httpClient.post(`${this.apiUrl}/subscribe`, data);
  }

  subscribeForPayment(email: string, name: string, message: string) {
    return this.subscribe({
      email,
      name,
      message,
      tags: 'newsletter',
    });
  }

  subscribeForComingSoon(email: string): Observable<any> {
    return this.subscribe({
      email,
      tags: 'coming-soon',
    });
  }
}

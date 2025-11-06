import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private httpClient = inject(HttpClient);

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
}

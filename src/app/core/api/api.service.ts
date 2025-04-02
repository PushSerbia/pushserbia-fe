import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ApiService<Model> {
  protected abstract endpoint: string;

  protected httpClient = inject(HttpClient);

  getAll(params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`/${this.endpoint}`, { params });
  }

  getById<R = Model>(id: string): Observable<R> {
    return this.httpClient.get<R>(`/${this.endpoint}/${id}`);
  }

  create(data: Partial<Model>): Observable<Model> {
    return this.httpClient.post<Model>(`/${this.endpoint}`, data);
  }

  update(id: string, data: Partial<Model>): Observable<Model> {
    return this.httpClient.patch<Model>(
      `/${this.endpoint}/${id}`,
      data,
    );
  }

  set(id: string, data: Partial<Model>): Observable<Model> {
    // should be PUT
    return this.httpClient.post<Model>(
      `/${this.endpoint}/${id}`,
      data,
    );
  }

  delete(id: string): Observable<Model> {
    return this.httpClient.delete<Model>(
      `/${this.endpoint}/${id}`,
    );
  }
}

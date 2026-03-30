import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { apiInterceptor } from './api.interceptor';
import { environment } from '../../../environments/environment';

describe('apiInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should prepend API base URL to relative URLs', () => {
    httpClient.get('/users').subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.url).toBe(`${environment.apiUrl}/users`);
    req.flush({});
  });

  it('should prepend API base URL to relative URLs with query parameters', () => {
    httpClient.get('/users?id=123').subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}/users?id=123`);
    expect(req.request.url).toBe(`${environment.apiUrl}/users?id=123`);
    req.flush({});
  });

  it('should not modify absolute URLs that start with http', () => {
    const absoluteUrl = 'http://example.com/api/data';
    httpClient.get(absoluteUrl).subscribe();
    const req = httpTesting.expectOne(absoluteUrl);
    expect(req.request.url).toBe(absoluteUrl);
    req.flush({});
  });

  it('should not modify absolute URLs that start with https', () => {
    const absoluteUrl = 'https://example.com/api/data';
    httpClient.get(absoluteUrl).subscribe();
    const req = httpTesting.expectOne(absoluteUrl);
    expect(req.request.url).toBe(absoluteUrl);
    req.flush({});
  });

  it('should pass through successful responses', () => {
    let response: unknown;
    httpClient.get('/data').subscribe((res) => (response = res));
    const req = httpTesting.expectOne(`${environment.apiUrl}/data`);
    const expectedData = { status: 'ok' };
    req.flush(expectedData);
    expect(response).toEqual(expectedData);
  });

  it('should handle empty relative paths', () => {
    httpClient.get('').subscribe();
    const req = httpTesting.expectOne(`${environment.apiUrl}`);
    expect(req.request.url).toBe(`${environment.apiUrl}`);
    req.flush({});
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthClient } from './auth-client';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let mockAuthClient: jasmine.SpyObj<AuthClient>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthClient = jasmine.createSpyObj('AuthClient', ['signOut']);
    mockAuthClient.signOut.and.returnValue(of(undefined));

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthClient, useValue: mockAuthClient },
        { provide: Router, useValue: mockRouter },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should add withCredentials to requests', () => {
    httpClient.get('/api/test').subscribe();
    const req = httpTesting.expectOne('/api/test');
    expect(req.request.withCredentials).toBeTrue();
    req.flush({});
  });

  it('should pass through successful responses', () => {
    let response: unknown;
    httpClient.get('/api/test').subscribe((res) => (response = res));
    const req = httpTesting.expectOne('/api/test');
    req.flush({ data: 'ok' });
    expect(response).toEqual({ data: 'ok' });
  });

  it('should sign out and navigate on 401 error', () => {
    httpClient.get('/api/test').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      },
    });
    const req = httpTesting.expectOne('/api/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(mockAuthClient.signOut).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/autentikacija/prijava');
  });

  it('should not sign out on non-401 errors', () => {
    httpClient.get('/api/test').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    });
    const req = httpTesting.expectOne('/api/test');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(mockAuthClient.signOut).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});

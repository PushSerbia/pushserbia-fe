import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['signOut']);
    mockAuthService.signOut.and.returnValue(of(undefined));

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
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

    expect(mockAuthService.signOut).toHaveBeenCalled();
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

    expect(mockAuthService.signOut).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});

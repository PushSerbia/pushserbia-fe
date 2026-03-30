import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthClient } from './auth-client';
import { vi } from 'vitest';

describe('authGuard', () => {
  let $authenticatedSpy: ReturnType<typeof vi.fn>;
  let mockRouter: { parseUrl: ReturnType<typeof vi.fn> };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    $authenticatedSpy = vi.fn().mockReturnValue(false);

    mockRouter = {
      parseUrl: vi.fn().mockReturnValue({} as UrlTree),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthClient,
          useValue: {
            $authenticated: $authenticatedSpy,
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user is authenticated', () => {
    $authenticatedSpy.mockReturnValue(true);

    const result = executeGuard(
      {} as Parameters<CanActivateFn>[0],
      {} as Parameters<CanActivateFn>[1],
    );

    expect(result).toBe(true);
    expect(mockRouter.parseUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login page when user is not authenticated', () => {
    const loginUrlTree = {} as UrlTree;
    mockRouter.parseUrl.mockReturnValue(loginUrlTree);
    $authenticatedSpy.mockReturnValue(false);

    const result = executeGuard(
      {} as Parameters<CanActivateFn>[0],
      {} as Parameters<CanActivateFn>[1],
    );

    expect(result).toBe(loginUrlTree);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith(
      '/autentikacija/prijava',
    );
  });

  it('should redirect to login page and not to home page', () => {
    $authenticatedSpy.mockReturnValue(false);

    executeGuard(
      {} as Parameters<CanActivateFn>[0],
      {} as Parameters<CanActivateFn>[1],
    );

    expect(mockRouter.parseUrl).not.toHaveBeenCalledWith('/');
    expect(mockRouter.parseUrl).toHaveBeenCalledWith(
      '/autentikacija/prijava',
    );
  });
});

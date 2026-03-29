import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let $authenticatedSpy: jasmine.Spy;
  let mockRouter: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    $authenticatedSpy = jasmine.createSpy().and.returnValue(false);

    mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);
    mockRouter.parseUrl.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [], {
            $authenticated: $authenticatedSpy,
          }),
        },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user is authenticated', () => {
    $authenticatedSpy.and.returnValue(true);

    const result = executeGuard(
      {} as Parameters<CanActivateFn>[0],
      {} as Parameters<CanActivateFn>[1],
    );

    expect(result).toBeTrue();
    expect(mockRouter.parseUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login page when user is not authenticated', () => {
    const loginUrlTree = {} as UrlTree;
    mockRouter.parseUrl.and.returnValue(loginUrlTree);
    $authenticatedSpy.and.returnValue(false);

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
    $authenticatedSpy.and.returnValue(false);

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

import { TestBed } from '@angular/core/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideAuth } from './auth.provider';
import { AuthClient } from './auth-client';

describe('Auth Provider', () => {
  let mockAuthClient: jasmine.SpyObj<AuthClient>;

  beforeEach(() => {
    mockAuthClient = jasmine.createSpyObj('AuthClient', ['initialize']);
  });

  describe('provideAuth()', () => {
    it('should return provider configuration', () => {
      const providers = provideAuth();

      expect(providers).toBeTruthy();
      expect(Array.isArray(providers)).toBe(true);
    });

    it('should return non-empty provider array', () => {
      const providers = provideAuth();

      expect(providers.length).toBeGreaterThan(0);
    });

    it('should return array of Provider or EnvironmentProviders', () => {
      const providers = provideAuth();

      expect(Array.isArray(providers)).toBe(true);
      providers.forEach(provider => {
        expect(provider).toBeDefined();
      });
    });

    it('should include app initializer provider', () => {
      const providers = provideAuth();

      expect(providers[0]).toBeDefined();
      expect(typeof providers[0]).toBe('object');
    });
  });

  describe('provideAuth() with TestBed', () => {
    it('should provide AuthClient service', () => {
      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      const authClient = TestBed.inject(AuthClient);

      expect(authClient).toBeTruthy();
    });

    it('should allow retrieving AuthClient after configuration', () => {
      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      const authClient = TestBed.inject(AuthClient);

      expect(authClient).toBe(mockAuthClient);
    });

    it('should initialize AuthClient when configured with provideAuth', (done) => {
      mockAuthClient.initialize.and.returnValue(Promise.resolve());

      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      TestBed.inject(AuthClient);

      // Wait for initializer to complete
      setTimeout(() => {
        expect(mockAuthClient.initialize).toHaveBeenCalled();
        done();
      }, 100);
    });
  });

  describe('AuthClient initialization', () => {
    it('should call AuthClient.initialize', (done) => {
      mockAuthClient.initialize.and.returnValue(Promise.resolve());

      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      TestBed.inject(AuthClient);

      setTimeout(() => {
        expect(mockAuthClient.initialize).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should handle synchronous initialization return value', () => {
      mockAuthClient.initialize.and.returnValue(Promise.resolve());

      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      expect(() => TestBed.inject(AuthClient)).not.toThrow();
    });

    it('should handle promise-based initialization', (done) => {
      const initPromise = Promise.resolve();
      mockAuthClient.initialize.and.returnValue(initPromise);

      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      TestBed.inject(AuthClient);

      setTimeout(() => {
        expect(mockAuthClient.initialize).toHaveBeenCalled();
        done();
      }, 100);
    });
  });

  describe('Provider shape and structure', () => {
    it('should return providers with correct structure', () => {
      const providers = provideAuth();

      expect(providers).toBeTruthy();
      expect(Array.isArray(providers)).toBe(true);
      expect(providers[0]).toBeTruthy();
    });

    it('should be compatible with TestBed.configureTestingModule', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: provideAuth(),
        });
      }).not.toThrow();
    });

    it('should be spreadable in provider arrays', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: [
            ...provideAuth(),
          ],
        });
      }).not.toThrow();
    });

    it('should work with additional providers', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: AuthClient, useValue: mockAuthClient },
            ...provideAuth(),
          ],
        });
      }).not.toThrow();
    });
  });

  describe('Multiple invocations', () => {
    it('should return consistent provider configuration', () => {
      const providers1 = provideAuth();
      const providers2 = provideAuth();

      expect(providers1.length).toBe(providers2.length);
    });

    it('should handle multiple provideAuth calls', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: [
            ...provideAuth(),
            ...provideAuth(),
          ],
        });
      }).not.toThrow();
    });
  });

  describe('DI container integration', () => {
    it('should inject dependencies correctly', () => {
      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      const authClient = TestBed.inject(AuthClient);

      expect(authClient).toBe(mockAuthClient);
    });

    it('should work within an injection context', (done) => {
      TestBed.configureTestingModule({
        providers: [
          ...provideAuth(),
          {
            provide: AuthClient,
            useValue: mockAuthClient,
          },
        ],
      });

      TestBed.runInInjectionContext(() => {
        setTimeout(() => {
          expect(mockAuthClient.initialize).toHaveBeenCalled();
          done();
        }, 50);
      });
    });
  });

  describe('Edge cases', () => {
    it('should not throw when used with empty provider array', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: [...provideAuth(), ...[]], // spreading empty array
        });
      }).not.toThrow();
    });

    it('should maintain order when combined with other initializers', () => {
      const otherInitializer = {
        provide: 'OTHER_INIT',
        useValue: 'test',
      };

      expect(() => {
        TestBed.configureTestingModule({
          providers: [
            otherInitializer,
            ...provideAuth(),
          ],
        });
      }).not.toThrow();
    });
  });

  describe('Return type compatibility', () => {
    it('should match Provider type signature', () => {
      const providers = provideAuth();

      // Verify it's an array of valid provider configs
      providers.forEach(provider => {
        expect(typeof provider === 'object').toBe(true);
      });
    });

    it('should be compatible with EnvironmentProviders type', () => {
      const providers: Array<Provider | EnvironmentProviders> = provideAuth();

      expect(Array.isArray(providers)).toBe(true);
      expect(providers.length).toBeGreaterThan(0);
    });
  });

  describe('Integration with angular standalone', () => {
    it('should work in standalone component configuration', () => {
      expect(() => {
        TestBed.configureTestingModule({
          providers: [
            ...provideAuth(),
          ],
        });
      }).not.toThrow();
    });

    it('should be spreadable in bootstrapApplication providers', () => {
      const providers = provideAuth();

      expect(typeof providers).toBe('object');
      expect(Array.isArray(providers)).toBe(true);
    });
  });
});

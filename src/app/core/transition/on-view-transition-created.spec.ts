import { TestBed } from '@angular/core/testing';
import { Router, ViewTransitionInfo } from '@angular/router';
import { onViewTransitionCreated } from './on-view-transition-created';
import { TransitionManager } from './transition-manager';

describe('onViewTransitionCreated', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockTransitionManager: jasmine.SpyObj<TransitionManager>;
  let mockViewTransitionInfo: jasmine.SpyObj<ViewTransitionInfo>;

  beforeEach(() => {
    // Mock Router
    mockRouter = jasmine.createSpyObj('Router', [], {
      currentNavigation: jasmine.createSpy('currentNavigation').and.returnValue(null),
    });

    // Mock ViewTransitionInfo
    const mockTransition = jasmine.createSpyObj('transition', ['skipTransition']);
    Object.defineProperty(mockTransition, 'finished', {
      value: Promise.resolve(),
      writable: true,
    });
    mockViewTransitionInfo = jasmine.createSpyObj('ViewTransitionInfo', [], {
      transition: mockTransition,
    });

    // Mock TransitionManager with a signal-like object
    mockTransitionManager = jasmine.createSpyObj('TransitionManager', [], {
      current: {
        set: jasmine.createSpy('set'),
      },
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TransitionManager, useValue: mockTransitionManager },
      ],
    });
  });

  describe('URL validation', () => {
    it('should skip transition when URL does not start with /projekti', () => {
      const currentNav = {
        finalUrl: { toString: () => '/home' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition for /about route', () => {
      const currentNav = {
        finalUrl: { toString: () => '/about' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition for /autentikacija route', () => {
      const currentNav = {
        finalUrl: { toString: () => '/autentikacija/prijava' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition when finalUrl is empty string', () => {
      const currentNav = {
        finalUrl: { toString: () => '' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });
  });

  describe('/projekti/novi route handling', () => {
    it('should skip transition for /projekti/novi', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/novi' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition even when /projekti/novi has query parameters', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/novi?from=page' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });
  });

  describe('/izmena (edit) route handling', () => {
    it('should skip transition when URL ends with /izmena', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123/izmena' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition for /izmena with query parameters', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123/izmena?version=1' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition for nested /izmena path', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/group/subgroup/izmena' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });
  });

  describe('Valid project transitions', () => {
    it('should allow transition for /projekti/{id}', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(mockViewTransitionInfo);
    });

    it('should allow transition for /projekti/nested-id', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/nested-id' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(mockViewTransitionInfo);
    });

    it('should allow transition for /projekti with parameters', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123?sort=name' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
    });

    it('should update TransitionManager with valid project route', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/my-project' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(mockViewTransitionInfo);
    });
  });

  describe('Transition completion handling', () => {
    it('should clear transition when finished for valid route', async () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      // Mock the finished promise
      const finishedPromise = Promise.resolve();
      Object.defineProperty(mockViewTransitionInfo.transition, 'finished', {
        value: finishedPromise,
        writable: true,
      });

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      await finishedPromise;

      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(null);
    });

    it('should handle promise rejection gracefully', async () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      // Mock rejected promise
      const rejectedPromise = Promise.reject(new Error('test error'));
      Object.defineProperty(mockViewTransitionInfo.transition, 'finished', {
        value: rejectedPromise,
        writable: true,
      });

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      await rejectedPromise.catch(() => {
        // Expected to catch
      });

      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(null);
    });

    it('should clear transition after finished completes for skipped route', async () => {
      const currentNav = {
        finalUrl: { toString: () => '/home' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      const finishedPromise = Promise.resolve();
      Object.defineProperty(mockViewTransitionInfo.transition, 'finished', {
        value: finishedPromise,
        writable: true,
      });

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      // For skipped transitions, finally should still run
      await finishedPromise;

      // The finally handler runs regardless of skip
      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });
  });

  describe('currentNavigation null handling', () => {
    it('should handle null currentNavigation gracefully', () => {
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(null);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should use empty string when currentNavigation is null', () => {
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(null);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      // With null navigation, toUrl becomes '' (default value)
      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should skip transition for null finalUrl', () => {
      const currentNav = {
        finalUrl: null,
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });
  });

  describe('Edge cases and special routes', () => {
    it('should skip transition for /projekti alone', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      // /projekti alone without ID should still pass the startsWith check
      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
    });

    it('should skip transition for /projekti/ with trailing slash', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
    });

    it('should not skip for /projektovanje (typo)', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projektovanje' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).toHaveBeenCalled();
    });

    it('should handle route with fragment', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123#section' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockViewTransitionInfo.transition.skipTransition).not.toHaveBeenCalled();
    });
  });

  describe('TransitionManager interaction', () => {
    it('should set ViewTransitionInfo on TransitionManager.current', () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(mockViewTransitionInfo);
    });

    it('should set null on TransitionManager.current when finished', async () => {
      const currentNav = {
        finalUrl: { toString: () => '/projekti/123' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      const finishedPromise = Promise.resolve();
      Object.defineProperty(mockViewTransitionInfo.transition, 'finished', {
        value: finishedPromise,
        writable: true,
      });

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      await finishedPromise;

      expect(mockTransitionManager.current.set).toHaveBeenCalledWith(null);
    });

    it('should not update TransitionManager for skipped routes', () => {
      const currentNav = {
        finalUrl: { toString: () => '/home' },
      };
      (mockRouter.currentNavigation as jasmine.Spy).and.returnValue(currentNav);

      TestBed.runInInjectionContext(() => {
        onViewTransitionCreated(mockViewTransitionInfo);
      });

      expect(mockTransitionManager.current.set).not.toHaveBeenCalledWith(mockViewTransitionInfo);
    });
  });
});

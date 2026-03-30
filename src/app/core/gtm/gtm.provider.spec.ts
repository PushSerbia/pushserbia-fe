import { TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { provideGtm, initializeGtm } from './gtm.provider';
import { GtmManager } from './gtm-manager';
import { environment } from '../../../environments/environment';
import { vi } from 'vitest';

describe('GTM Provider', () => {
  describe('provideGtm()', () => {
    it('should return empty array in non-production environment', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);

      const providers = provideGtm();

      expect(providers).toEqual([]);
    });

    it('should return provider configuration in production environment', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();

      expect(providers.length).toBe(1);
      expect(providers[0]).toBeDefined();
    });

    it('should provide APP_INITIALIZER token in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.provide).toBe(APP_INITIALIZER);
    });

    it('should use factory function in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.useFactory).toBeDefined();
      expect(typeof provider.useFactory).toBe('function');
    });

    it('should specify GtmManager as dependency', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.deps).toContain(GtmManager);
    });

    it('should set multi to true', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.multi).toBe(true);
    });
  });

  describe('initializeGtm()', () => {
    let mockGtmManager: any;

    beforeEach(() => {
      mockGtmManager = {
        initialize: vi.fn(),
      };
    });

    it('should return a function', () => {
      const result = initializeGtm(mockGtmManager);

      expect(typeof result).toBe('function');
    });

    it('should call GtmManager.initialize when executed', () => {
      const initializeFn = initializeGtm(mockGtmManager);

      initializeFn();

      expect(mockGtmManager.initialize).toHaveBeenCalled();
    });

    it('should call GtmManager.initialize exactly once when the returned function is executed', () => {
      const initializeFn = initializeGtm(mockGtmManager);

      initializeFn();

      expect(mockGtmManager.initialize).toHaveBeenCalledTimes(1);
    });

    it('should not call GtmManager.initialize when factory is created but not executed', () => {
      initializeGtm(mockGtmManager);

      expect(mockGtmManager.initialize).not.toHaveBeenCalled();
    });

    it('should pass the gtmService instance to the initializer', () => {
      const initializeFn = initializeGtm(mockGtmManager);
      initializeFn();

      expect(mockGtmManager.initialize).toHaveBeenCalledWith();
    });

    it('should work with multiple GtmManager instances', () => {
      const manager1 = { initialize: vi.fn() };
      const manager2 = { initialize: vi.fn() };

      const initFn1 = initializeGtm(manager1 as unknown as GtmManager);
      const initFn2 = initializeGtm(manager2 as unknown as GtmManager);

      initFn1();
      initFn2();

      expect(manager1.initialize).toHaveBeenCalledTimes(1);
      expect(manager2.initialize).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration with TestBed', () => {
    it('should provide GTM provider through TestBed in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      TestBed.configureTestingModule({
        providers: [
          ...provideGtm(),
          GtmManager,
        ],
      });

      const gtmManager = TestBed.inject(GtmManager);
      expect(gtmManager).toBeTruthy();
    });

    it('should allow bootstrap without GTM provider in non-production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);

      TestBed.configureTestingModule({
        providers: [
          ...provideGtm(),
          GtmManager,
        ],
      });

      const gtmManager = TestBed.inject(GtmManager);
      expect(gtmManager).toBeTruthy();
    });
  });

  describe('Provider structure', () => {
    it('should return array of Provider type', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();

      expect(Array.isArray(providers)).toBe(true);
    });

    it('should maintain provider shape consistency', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.provide).toBeDefined();
      expect(provider.useFactory).toBeDefined();
      expect(provider.deps).toBeDefined();
      expect(provider.multi).toBeDefined();
    });

    it('should have correct provider order in returned array', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();

      expect(providers.length).toBe(1);
      expect((providers[0] as any).provide).toBe(APP_INITIALIZER);
    });
  });

  describe('Factory function behavior', () => {
    it('should return a callable function from factory', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;
      const mockGtmManager = { initialize: vi.fn() };

      const initFn = provider.useFactory(mockGtmManager as unknown as GtmManager);

      expect(typeof initFn).toBe('function');
      expect(() => initFn()).not.toThrow();
    });

    it('should handle synchronous initialization', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;
      const mockGtmManager = { initialize: vi.fn() };

      const initFn = provider.useFactory(mockGtmManager as unknown as GtmManager);
      const result = initFn();

      expect(mockGtmManager.initialize).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('Conditional provider configuration', () => {
    it('should return non-empty array only in production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(true);
      const prodProviders = provideGtm();

      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);
      const devProviders = provideGtm();

      expect(prodProviders.length).toBeGreaterThan(0);
      expect(devProviders.length).toBe(0);
    });

    it('should not create provider redundancy in non-production', () => {
      vi.spyOn(environment, 'production', 'get').mockReturnValue(false);

      const providers = provideGtm();

      expect(providers.length).toBe(0);
      expect(providers).toEqual([]);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { provideGtm, initializeGtm } from './gtm.provider';
import { GtmManager } from './gtm-manager';
import { environment } from '../../../environments/environment';

describe('GTM Provider', () => {
  describe('provideGtm()', () => {
    it('should return empty array in non-production environment', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(false);

      const providers = provideGtm();

      expect(providers).toEqual([]);
    });

    it('should return provider configuration in production environment', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();

      expect(providers.length).toBe(1);
      expect(providers[0]).toBeDefined();
    });

    it('should provide APP_INITIALIZER token in production', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.provide).toBe(APP_INITIALIZER);
    });

    it('should use factory function in production', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.useFactory).toBeDefined();
      expect(typeof provider.useFactory).toBe('function');
    });

    it('should specify GtmManager as dependency', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.deps).toContain(GtmManager);
    });

    it('should set multi to true', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.multi).toBe(true);
    });
  });

  describe('initializeGtm()', () => {
    let mockGtmManager: jasmine.SpyObj<GtmManager>;

    beforeEach(() => {
      mockGtmManager = jasmine.createSpyObj('GtmManager', ['initialize']);
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
      const manager1 = jasmine.createSpyObj('GtmManager', ['initialize']);
      const manager2 = jasmine.createSpyObj('GtmManager', ['initialize']);

      const initFn1 = initializeGtm(manager1);
      const initFn2 = initializeGtm(manager2);

      initFn1();
      initFn2();

      expect(manager1.initialize).toHaveBeenCalledTimes(1);
      expect(manager2.initialize).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration with TestBed', () => {
    it('should provide GTM provider through TestBed in production', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

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
      spyOnProperty(environment, 'production', 'get').and.returnValue(false);

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
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();

      expect(Array.isArray(providers)).toBe(true);
    });

    it('should maintain provider shape consistency', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;

      expect(provider.provide).toBeDefined();
      expect(provider.useFactory).toBeDefined();
      expect(provider.deps).toBeDefined();
      expect(provider.multi).toBeDefined();
    });

    it('should have correct provider order in returned array', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();

      expect(providers.length).toBe(1);
      expect((providers[0] as any).provide).toBe(APP_INITIALIZER);
    });
  });

  describe('Factory function behavior', () => {
    it('should return a callable function from factory', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;
      const mockGtmManager = jasmine.createSpyObj('GtmManager', ['initialize']);

      const initFn = provider.useFactory(mockGtmManager);

      expect(typeof initFn).toBe('function');
      expect(() => initFn()).not.toThrow();
    });

    it('should handle synchronous initialization', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);

      const providers = provideGtm();
      const provider = providers[0] as any;
      const mockGtmManager = jasmine.createSpyObj('GtmManager', ['initialize']);

      const initFn = provider.useFactory(mockGtmManager);
      const result = initFn();

      expect(mockGtmManager.initialize).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('Conditional provider configuration', () => {
    it('should return non-empty array only in production', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(true);
      const prodProviders = provideGtm();

      spyOnProperty(environment, 'production', 'get').and.returnValue(false);
      const devProviders = provideGtm();

      expect(prodProviders.length).toBeGreaterThan(0);
      expect(devProviders.length).toBe(0);
    });

    it('should not create provider redundancy in non-production', () => {
      spyOnProperty(environment, 'production', 'get').and.returnValue(false);

      const providers = provideGtm();

      expect(providers.length).toBe(0);
      expect(providers).toEqual([]);
    });
  });
});

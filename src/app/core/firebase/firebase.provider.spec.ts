import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { provideFirebase } from './firebase.provider';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CONFIG, DEBUG_MODE } from '@angular/fire/compat/analytics';
import { environment } from '../../../environments/environment';

describe('provideFirebase', () => {
  it('should return an array of providers', () => {
    const providers = provideFirebase();
    expect(Array.isArray(providers)).toBeTrue();
    expect(providers.length).toBeGreaterThan(0);
  });

  it('should include Firebase options provider', () => {
    const providers = provideFirebase();
    const firebaseOptionsProvider = providers.find(
      (p) => typeof p === 'object' && 'provide' in p && p.provide === FIREBASE_OPTIONS,
    );
    expect(firebaseOptionsProvider).toBeTruthy();
  });

  it('should use environment firebase config for Firebase options', () => {
    TestBed.configureTestingModule({
      providers: provideFirebase(),
    });

    const firebaseOptions = TestBed.inject(FIREBASE_OPTIONS);
    expect(firebaseOptions).toEqual(environment.firebase);
  });

  it('should include CONFIG provider with send_page_view enabled', () => {
    TestBed.configureTestingModule({
      providers: provideFirebase(),
    });

    const config = TestBed.inject(CONFIG);
    expect(config).toEqual({ send_page_view: true });
  });

  it('should set DEBUG_MODE to false in production', () => {
    const originalProduction = environment.production;
    Object.defineProperty(environment, 'production', {
      value: true,
      configurable: true,
    });

    TestBed.configureTestingModule({
      providers: provideFirebase(),
    });

    const debugMode = TestBed.inject(DEBUG_MODE);
    expect(debugMode).toBeFalse();

    Object.defineProperty(environment, 'production', {
      value: originalProduction,
      configurable: true,
    });
  });

  it('should set DEBUG_MODE to true in development', () => {
    const originalProduction = environment.production;
    Object.defineProperty(environment, 'production', {
      value: false,
      configurable: true,
    });

    TestBed.configureTestingModule({
      providers: provideFirebase(),
    });

    const debugMode = TestBed.inject(DEBUG_MODE);
    expect(debugMode).toBeTrue();

    Object.defineProperty(environment, 'production', {
      value: originalProduction,
      configurable: true,
    });
  });

  it('should include provideFirebaseApp function', () => {
    const providers = provideFirebase();
    const firebaseAppProvider = providers.find(
      (p) => typeof p === 'function' && p.toString().includes('provideFirebaseApp'),
    );
    expect(firebaseAppProvider).toBeTruthy();
  });

  it('should include provideAuth function', () => {
    const providers = provideFirebase();
    const authProvider = providers.find(
      (p) => typeof p === 'function' && p.toString().includes('provideAuth'),
    );
    expect(authProvider).toBeTruthy();
  });

  it('should include provideAnalytics function', () => {
    const providers = provideFirebase();
    const analyticsProvider = providers.find(
      (p) => typeof p === 'function' && p.toString().includes('provideAnalytics'),
    );
    expect(analyticsProvider).toBeTruthy();
  });

  it('should include providePerformance function', () => {
    const providers = provideFirebase();
    const performanceProvider = providers.find(
      (p) => typeof p === 'function' && p.toString().includes('providePerformance'),
    );
    expect(performanceProvider).toBeTruthy();
  });

  it('should include importProvidersFrom for services', () => {
    const providers = provideFirebase();
    const importProvidersProvider = providers.find(
      (p) => typeof p === 'function' && p.toString().includes('importProvidersFrom'),
    );
    expect(importProvidersProvider).toBeTruthy();
  });

  it('should work with browser platform', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebase(),
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    expect(() => {
      TestBed.inject(FIREBASE_OPTIONS);
      TestBed.inject(CONFIG);
      TestBed.inject(DEBUG_MODE);
    }).not.toThrow();
  });

  it('should work with server platform', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebase(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    expect(() => {
      TestBed.inject(FIREBASE_OPTIONS);
      TestBed.inject(CONFIG);
      TestBed.inject(DEBUG_MODE);
    }).not.toThrow();
  });

  it('should have correct firebase configuration', () => {
    const firebaseConfig = environment.firebase;
    expect(firebaseConfig.projectId).toBeTruthy();
    expect(firebaseConfig.apiKey).toBeTruthy();
    expect(firebaseConfig.authDomain).toBeTruthy();
    expect(firebaseConfig.appId).toBeTruthy();
  });
});

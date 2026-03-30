import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { provideFirebase } from './firebase.provider';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CONFIG, DEBUG_MODE } from '@angular/fire/compat/analytics';
import { environment } from '../../../environments/environment';
import { vi } from 'vitest';

describe('provideFirebase', () => {
  it('should return an array of providers', () => {
    const providers = provideFirebase();
    expect(Array.isArray(providers)).toBe(true);
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

  it('should set DEBUG_MODE based on environment.production', () => {
    TestBed.configureTestingModule({
      providers: provideFirebase(),
    });

    const debugMode = TestBed.inject(DEBUG_MODE);
    expect(typeof debugMode).toBe('boolean');
    expect(debugMode).toBe(!environment.production);
  });
});

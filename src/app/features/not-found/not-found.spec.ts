import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE_INIT } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  const mockAfAuth = {
    idTokenResult: of(null),
    onIdTokenChanged: vi.fn(),
    idToken: of(null),
    user: of(null),
    signOut: vi.fn().mockReturnValue(Promise.resolve()),
  };

  const firebaseProviders = [
    provideRouter([]),
    provideHttpClient(),
    provideHttpClientTesting(),
    { provide: FIREBASE_OPTIONS, useValue: { apiKey: 'test-key', projectId: 'test' } },
    { provide: AngularFireAuth, useValue: mockAfAuth },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [...firebaseProviders],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set response status to 404 when RESPONSE_INIT is provided', () => {
    const mockResponse = { status: 200 };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [...firebaseProviders, { provide: RESPONSE_INIT, useValue: mockResponse }],
    });

    fixture = TestBed.createComponent(NotFound);
    expect(mockResponse.status).toBe(404);
  });
});

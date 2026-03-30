import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Account } from './account';
import { AuthClient } from '../../../core/auth/auth-client';

describe('Account', () => {
  let component: Account;
  let fixture: ComponentFixture<Account>;

  beforeEach(async () => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      signInWithCustomToken: vi.fn().mockReturnValue(of(undefined)),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [Account],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthClient, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Account);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

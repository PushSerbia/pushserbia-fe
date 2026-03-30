import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { VoteStore } from './vote-store';
import { AuthClient } from '../auth/auth-client';

describe('VoteStore', () => {
  let service: VoteStore;

  beforeEach(() => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthClient, useValue: authServiceMock },
      ],
    });
    service = TestBed.inject(VoteStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

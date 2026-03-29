import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VoteStore } from './vote-store';
import { AuthClient } from '../auth/auth-client';

describe('VoteStore', () => {
  let service: VoteStore;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj(
      'AuthClient',
      ['signOut', 'getMe', 'updateMe'],
      {
        $authenticated: jasmine.createSpy().and.returnValue(false),
        $userData: jasmine.createSpy().and.returnValue(undefined),
        $fullUserData: jasmine.createSpy().and.returnValue(null),
        userData$: of(undefined),
      },
    );

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

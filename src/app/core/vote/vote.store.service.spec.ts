import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VoteStoreService } from './vote.store.service';
import { AuthService } from '../auth/auth.service';

describe('VoteStoreService', () => {
  let service: VoteStoreService;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj(
      'AuthService',
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
        { provide: AuthService, useValue: authServiceMock },
      ],
    });
    service = TestBed.inject(VoteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

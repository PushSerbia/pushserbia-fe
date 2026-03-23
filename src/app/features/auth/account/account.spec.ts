import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { Account } from './account';
import { AuthService } from '../../../core/auth/auth.service';

describe('Account', () => {
  let component: Account;
  let fixture: ComponentFixture<Account>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj(
      'AuthService',
      ['signOut', 'getMe', 'updateMe', 'signInWithCustomToken'],
      {
        $authenticated: jasmine.createSpy().and.returnValue(false),
        $userData: jasmine.createSpy().and.returnValue(undefined),
        $fullUserData: jasmine.createSpy().and.returnValue(null),
        userData$: of(undefined),
      },
    );
    authServiceMock.signInWithCustomToken.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [Account],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock },
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

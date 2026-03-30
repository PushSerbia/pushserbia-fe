import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { UserWidget } from './user-widget';
import { AuthClient } from '../../../core/auth/auth-client';

describe('UserWidget', () => {
  let component: UserWidget;
  let fixture: ComponentFixture<UserWidget>;

  beforeEach(async () => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [UserWidget],
      providers: [
        provideRouter([]),
        { provide: AuthClient, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { of } from 'rxjs';

import { ProfileSidenav } from './profile-sidenav';
import { AuthClient } from '../../../../../../core/auth/auth-client';

describe('ProfileSidenav', () => {
  let component: ProfileSidenav;
  let fixture: ComponentFixture<ProfileSidenav>;

  beforeEach(async () => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn(),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    } as unknown as AuthClient;

    await TestBed.configureTestingModule({
      imports: [ProfileSidenav],
      providers: [
        provideRouter([]),
        { provide: AuthClient, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';

import { ProfilePage } from './profile-page';
import { AuthClient } from '../../../../core/auth/auth-client';
import { ModalManager } from '../../../../core/modal/modal-manager';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    const authServiceMock = {
      signOut: vi.fn(),
      getMe: vi.fn().mockReturnValue(of(undefined)),
      updateMe: vi.fn(),
      $authenticated: vi.fn().mockReturnValue(false),
      $userData: vi.fn().mockReturnValue(undefined),
      $fullUserData: vi.fn().mockReturnValue(null),
      userData$: of(undefined),
    } as unknown as AuthClient;

    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthClient, useValue: authServiceMock },
        {
          provide: ModalManager,
          useValue: { open: vi.fn(), close: vi.fn(), remove: vi.fn() } as unknown as ModalManager,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

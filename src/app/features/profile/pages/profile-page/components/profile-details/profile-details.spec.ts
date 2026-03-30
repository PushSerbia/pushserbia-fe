import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { vi } from 'vitest';

import { of } from 'rxjs';

import { ProfileDetails } from './profile-details';
import { ModalManager } from '../../../../../../core/modal/modal-manager';
import { AuthClient } from '../../../../../../core/auth/auth-client';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { UserRole } from '../../../../../../core/user/user-role';

@Component({
  template: '<app-profile-details [data]="mockData" />',
  imports: [ProfileDetails],
})
class TestHostComponent {
  mockData: User & FirebaseUserData = {
    id: '1',
    firebaseUid: 'fb-1',
    fullName: 'Test User',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    gravatar: 'https://gravatar.com/test',
    imageUrl: 'https://example.com/img.png',
    role: UserRole.Participant,
    isBlocked: false,
    level: 1,
    projectsProposed: 0,
    projectsSupported: 0,
    membershipStatus: 'free',
  };
}

describe('ProfileDetails', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideRouter([]),
        {
          provide: ModalManager,
          useValue: { open: vi.fn(), close: vi.fn(), remove: vi.fn() } as unknown as ModalManager,
        },
        {
          provide: AuthClient,
          useValue: {
            signOut: vi.fn(),
            getMe: vi.fn(),
            updateMe: vi.fn(),
            $authenticated: vi.fn().mockReturnValue(false),
            $userData: vi.fn().mockReturnValue(undefined),
            $fullUserData: vi.fn().mockReturnValue(null),
            userData$: of(undefined),
          } as unknown as AuthClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const profileDetails = fixture.debugElement.children[0].componentInstance;
    expect(profileDetails).toBeTruthy();
  });
});

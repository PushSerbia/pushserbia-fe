import { TestBed } from '@angular/core/testing';
import { AuthClient } from './auth-client';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserApi } from '../user/user-api';
import { PLATFORM_ID, REQUEST } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { User } from '../user/user';
import { FirebaseUserData } from '../user/firebase-user-data';
import { UserRole } from '../user/user-role';
import firebase from 'firebase/compat/app';
import { vi } from 'vitest';

describe('AuthClient', () => {
  let service: AuthClient;
  let mockAfAuth: any;
  let mockUserApi: any;
  let httpTesting: HttpTestingController;

  const mockFirebaseUserData: FirebaseUserData = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    role: UserRole.Participant,
  };

  const mockUser: User = {
    id: 'user-123',
    firebaseUid: 'firebase-123',
    fullName: 'Test User',
    email: 'test@example.com',
    gravatar: '',
    imageUrl: 'https://example.com/image.jpg',
    role: UserRole.Participant,
    isBlocked: false,
    level: 1,
    projectsProposed: 0,
    projectsSupported: 0,
    membershipStatus: 'free',
  };

  beforeEach(() => {
    TestBed.resetTestingModule();

    const idTokenResultSubject = new BehaviorSubject<firebase.auth.IdTokenResult | null>(null);

    mockAfAuth = {
      signOut: vi.fn().mockReturnValue(Promise.resolve()),
      signInWithCustomToken: vi.fn(),
      onIdTokenChanged: vi.fn(),
      idTokenResult: idTokenResultSubject.asObservable(),
      idToken: of(null),
      user: of(null),
    };

    mockUserApi = {
      getMe: vi.fn(),
      updateMe: vi.fn(),
      createAccount: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthClient,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AngularFireAuth, useValue: mockAfAuth },
        { provide: UserApi, useValue: mockUserApi },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(AuthClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('signals and computed properties', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have initialize method', () => {
      expect(typeof service.initialize).toBe('function');
    });

    it('should have signals for authentication state', () => {
      expect(service.$authenticated).toBeDefined();
      expect(service.$userData).toBeDefined();
      expect(service.$fullUserData).toBeDefined();
    });

    it('$authenticated should be false when not authenticated', () => {
      expect(service.$authenticated()).toBe(false);
    });

    it('$userData should return undefined initially', () => {
      expect(service.$userData()).toBeUndefined();
    });

    it('$fullUserData should return null when not authenticated', () => {
      expect(service.$fullUserData()).toBeNull();
    });
  });

  describe('signOut', () => {
    it('should call Firebase signOut', async () => {
      mockAfAuth.signOut.mockReturnValue(Promise.resolve());

      const result = await firstValueFrom(service.signOut());

      expect(mockAfAuth.signOut).toHaveBeenCalled();
    });

    it('should return observable', () => {
      mockAfAuth.signOut.mockReturnValue(Promise.resolve());
      const obs = service.signOut();
      expect(obs).toBeDefined();
    });
  });

  describe('updateMe', () => {
    it('should call UserApi.updateMe with provided data', async () => {
      mockUserApi.updateMe.mockReturnValue(of(mockUser));

      const updateData: Partial<User> = { fullName: 'Updated Name' };
      const result = await firstValueFrom(service.updateMe(updateData));

      expect(mockUserApi.updateMe).toHaveBeenCalledWith(updateData);
      expect(result).toEqual(mockUser);
    });

    it('should return the updated user data', async () => {
      const updatedUser: User = { ...mockUser, fullName: 'New Name' };
      mockUserApi.updateMe.mockReturnValue(of(updatedUser));

      const result = await firstValueFrom(service.updateMe({ fullName: 'New Name' }));
      expect(result.fullName).toBe('New Name');
    });
  });

  describe('getMe', () => {
    it('should return EMPTY when not authenticated', async () => {
      let emitted = false;

      service.getMe().subscribe({
        next: () => (emitted = true),
      });

      // Wait a tick to allow observable to complete
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(emitted).toBe(false);
    });
  });

  describe('signInWithCustomToken', () => {
    it('should have signInWithCustomToken method', () => {
      expect(typeof service.signInWithCustomToken).toBe('function');
    });
  });

  describe('service methods', () => {
    it('should have all required methods', () => {
      expect(typeof service.signOut).toBe('function');
      expect(typeof service.getMe).toBe('function');
      expect(typeof service.updateMe).toBe('function');
      expect(typeof service.signInWithCustomToken).toBe('function');
    });
  });
});

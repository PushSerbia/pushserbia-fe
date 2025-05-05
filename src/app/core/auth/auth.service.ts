import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EMPTY, from, iif, map, Observable, of, switchMap, tap } from 'rxjs';
import { FirebaseUserData } from '../user/firebase-user-data';
import firebase from 'firebase/compat/app';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user-role';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import UserCredential = firebase.auth.UserCredential;

const CURRENT_USER_LOCAL_STORAGE_KEY = 'me';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly afAuth = inject(AngularFireAuth);
  private readonly userService = inject(UserService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly #currentUser = signal<User | null>(
    isPlatformBrowser(this.platformId)
      ? JSON.parse(localStorage.getItem(CURRENT_USER_LOCAL_STORAGE_KEY) || 'null')
      : null,
  );

  readonly currentUser = computed(() => this.#currentUser());

  userData$ = this.afAuth.idTokenResult.pipe(
    map((result: firebase.auth.IdTokenResult | null) => {
      if (!result) {
        return undefined;
      }
      const userData: FirebaseUserData = {
        id: result.claims['app_user_id'],
        name: result.claims['name'],
        email: result.claims['email'],
        emailVerified: result.claims['email_verified'],
        role: result.claims['app_user_role'] as UserRole,
        imageUrl: result.claims['picture'],
      };
      return userData;
    }),
  );
  authenticated$ = toSignal(this.userData$.pipe(map(Boolean)));

  signInWithCustomToken(token: string) {
    return from(this.afAuth.signInWithCustomToken(token)).pipe(
      switchMap((userCredential) => {
        return this.loadCurrentUser(userCredential);
      }),
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(tap(() => this.setUser(null)));
  }

  getMe(): Observable<User> {
    return iif(
      () => !this.#currentUser(),
      this.userService.getMe().pipe(tap((user: User) => this.setUser(user))),
      of(this.#currentUser() as User),
    );
  }

  private createAccount(params: {
    fullName: string;
    email: string;
    imageUrl: string;
  }) {
    return this.userService.createAccount(params).pipe(
      switchMap((account) => {
        return this.fetchNewToken().pipe(map(() => account));
      }),
    );
  }

  private loadCurrentUser(userCredential: UserCredential): Observable<User> {
    if (!userCredential?.user?.emailVerified) {
      throw new Error('Email is not verified');
    }

    return from(userCredential.user.getIdTokenResult()).pipe(
      switchMap((token: firebase.auth.IdTokenResult) => {
        if (!token.claims['app_user_id']) {
          return this.createAccount({
            fullName: token.claims['name'],
            email: token.claims['email'],
            imageUrl: token.claims['picture'],
          }).pipe(
            switchMap((user: User) => {
              return of(user);
            }),
          );
        }

        return this.getMe();
      }),
    );
  }

  private fetchNewToken() {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user: firebase.User | null) => {
        return user ? from(user.getIdToken(true)) : EMPTY;
      }),
    );
  }

  private setUser(user: User | null) {
    this.#currentUser.set(user);
    if (isPlatformBrowser(this.platformId)) {
      if (user === null) {
        localStorage.removeItem(CURRENT_USER_LOCAL_STORAGE_KEY);
      } else {
        localStorage.setItem(CURRENT_USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
      }
    }
  }
}

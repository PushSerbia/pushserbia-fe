import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  REQUEST,
  Signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  BehaviorSubject,
  EMPTY,
  first,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FirebaseUserData } from '../user/firebase-user-data';
import firebase from 'firebase/compat/app';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user-role';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthUtils } from './auth.utils';
import { HttpClient } from '@angular/common/http';
import UserCredential = firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly afAuth = inject(AngularFireAuth);
  private readonly userService = inject(UserService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private meLoading = false;
  private meDataSubject = new BehaviorSubject<User | null>(null);
  private userDataSubject = new BehaviorSubject<FirebaseUserData | undefined>(
    undefined,
  );

  userData$ = this.isBrowser
    ? this.afAuth.idTokenResult.pipe(
        map((result: firebase.auth.IdTokenResult | null) => {
          if (!result) {
            return undefined;
          }
          return this.extractUserDataFromToken(result);
        }),
      )
    : this.userDataSubject.asObservable();

  $authenticated = computed(() => Boolean(this.$userData()));
  $userData = toSignal(this.userData$);
  $meData = toSignal(this.meDataSubject.asObservable());
  $fullUserData: Signal<(User & FirebaseUserData) | null> = computed<
    (User & FirebaseUserData) | null
  >(() => {
    if (!this.$authenticated()) {
      return null;
    }
    const firebaseData = this.$userData();
    if (!firebaseData) {
      return null;
    }
    const meData = this.$meData();
    return {
      ...firebaseData,
      ...meData,
    } as User & FirebaseUserData;
  });

  private extractUserDataFromToken(
    result: firebase.auth.IdTokenResult,
  ): FirebaseUserData {
    return {
      id: result.claims['app_user_id'],
      name: result.claims['name'],
      email: result.claims['email'],
      emailVerified: result.claims['email_verified'],
      role: result.claims['app_user_role'] as UserRole,
      imageUrl: result.claims['picture'],
    };
  }

  constructor(private httpClient: HttpClient) {
    if (this.isBrowser) {
      this.initInBrowser();
      return;
    }
    this.initOnServer();
  }

  async initOnServer() {
    try {
      const request = inject(REQUEST, { optional: true });
      if (request) {
        let token;
        if (request.headers?.get('cookie')) {
          const cookies = request.headers.get('cookie');
          const tokenCookie = cookies
            ?.split(';')
            .find((c) => c.trim().startsWith('__auth'));
          if (tokenCookie) {
            token = tokenCookie.split('=')[1];
          }
        }

        if (token && !AuthUtils.isTokenExpired(token)) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(
                  (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
                )
                .join(''),
            );

            const claims = JSON.parse(jsonPayload);
            const userData: FirebaseUserData = {
              id: claims['app_user_id'],
              name: claims['name'],
              email: claims['email'],
              emailVerified: claims['email_verified'],
              role: claims['app_user_role'] as UserRole,
              imageUrl: claims['picture'],
            };
            this.userDataSubject.next(userData);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error initializing auth service on server:', error);
    }
  }

  initInBrowser(): void {
    this.afAuth.onIdTokenChanged((user) => {
      const source: Observable<string | null> = user
        ? from(user.getIdToken())
        : of(null);

      source
        .pipe(
          first(),
          switchMap((token) => this.setTokenToCookie(token)),
        )
        .subscribe();
    });
  }

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
    if (!this.$authenticated() || this.meLoading) {
      return EMPTY;
    }

    return this.userService
      .getMe()
      .pipe(tap((user: User) => this.setUser(user)));
  }

  updateMe(user: Partial<User>): Observable<User> {
    return this.userService.updateMe(user).pipe(
      tap((user: User) => {
        this.setUser(user);
      }),
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

  private setTokenToCookie(token: string | null): Observable<void> {
    return this.httpClient.post<void>(
      '/auth/set-token-to-cookie',
      { token },
      { withCredentials: true },
    );
  }

  private loadCurrentUser(userCredential: UserCredential): Observable<User> {
    if (!userCredential?.user?.emailVerified) {
      throw new Error('Email is not verified');
    }

    return from(userCredential.user.getIdTokenResult()).pipe(
      first(),
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

        return this.afAuth.idToken.pipe(
          first(),
          switchMap((token) => this.setTokenToCookie(token!)),
          switchMap(() => this.getMe()),
        );
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
    this.meDataSubject.next(user);
  }
}

import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, of, switchMap, } from 'rxjs';
import { FirebaseUserData } from '../user/firebase-user-data';
import firebase from 'firebase/compat/app';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user-role';
import UserCredential = firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  userData$ = this.afAuth.idTokenResult.pipe(map((result: firebase.auth.IdTokenResult | null) => {
    if (!result) {
      return undefined;
    }
    const userData: FirebaseUserData = {
      id: result.claims['app_user_id'],
      name: result.claims['name'],
      email: result.claims['email'],
      emailVerified: result.claims['email_verified'],
      role: result.claims['app_user_role'] as UserRole,
      photoUrl: result.claims['picture'],
    }
    return userData;
  }));

  constructor(
    private userService: UserService,
  ) {}

  isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

  signInWithCustomToken(token: string) {
    return from(this.afAuth.signInWithCustomToken(token)).pipe(
      switchMap((userCredential) => {
        return this.loadCurrentUser(userCredential);
      }),
    )
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  getMe(): Observable<User> {
    return this.userService.getMe();
  }

  private createAccount(params: { fullName: string; email: string }) {
    return this.userService
      .createAccount( params)
      .pipe(
        switchMap(account => {
          return this.fetchNewToken().pipe(map(() => account));
        }),
      );
  }

  private loadCurrentUser(userCredential: UserCredential): Observable<User> {
    if (!userCredential?.user?.emailVerified) {
      throw new Error('Email is not verified');
    }

    return from(userCredential.user.getIdTokenResult()).pipe(
      switchMap((token: any) => {
        if (!token.claims.app_user_id) {
          return this.createAccount({
            fullName: token.claims.name,
            email: token.claims.email,
          }).pipe(switchMap((user: any) => {
            return of(user);
          }));
        }

        return this.getMe();
      }),
    );
  }

  private fetchNewToken() {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user: any) => {
        return from(user.getIdToken(true));
      }),
    );
  }
}

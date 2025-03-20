import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap, } from 'rxjs';
import { FirebaseUserData } from '../user/firebase-user-data.types';
import firebase from 'firebase/compat/app';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private userData = new BehaviorSubject<FirebaseUserData | any>(undefined);
  userData$ = this.userData.asObservable();

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) {}

  signInWithCustomToken(token: string) {
    return from(this.afAuth.signInWithCustomToken(token)).pipe(
      switchMap((userCredential) => {
        return this.loadCurrentUser(userCredential);
      }),
    )
  }

  signOut(): Observable<any> {
    this._authenticated = false;

    return from(this.afAuth.signOut()).pipe(
      tap(() => {
        this.userData.next(undefined);
      }),
    );
  }

  getMe(): Observable<User> {
    return this.userService.getById(`me`);
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
    this._authenticated = true;

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
            this.userData.next({
              name: token.claims.name,
              email: token.claims.email,
              emailVerified: token.claims.email_verified,
              role: user.role,
              accountCreated: true,
              photoUrl: token.claims.picture,
              signInProvider: token.signInProvider,
            });
            return of(user);
          }));
        }

        this.userData.next({
          name: token.claims.name,
          email: token.claims.email,
          emailVerified: token.claims.email_verified,
          role: token.claims.app_user_role,
          accountCreated: Boolean(token.claims.app_user_id),
          photoUrl: token.claims.picture,
          signInProvider: token.signInProvider,
        });
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

import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _router: Router,
  ) {
    this.user$ = this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }),
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);

    return credential;
  }

  async signOut() {
    await this._afAuth.auth.signOut();
    this._router.navigate(['/login']);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this._afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      photoUrl: user.photoUrl || null,
      displayName: user.displayName || null,
    };

    return userRef.set(data, { merge: true });
  }
}

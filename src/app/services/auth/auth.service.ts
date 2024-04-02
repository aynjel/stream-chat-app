import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, pluck, switchMap } from 'rxjs';
import { LoginModel } from '../../pages/login/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private http: HttpClient = inject(HttpClient);
  private authState: BehaviorSubject<Object | null> =
    new BehaviorSubject<Object | null>(null);

  readonly authState$ = authState(this.auth);

  constructor() {}

  getStreamToken() {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/createStreamToken`, {
        user: this.getCurrentUser(),
      })
      .pipe(pluck('token'));
  }

  getCurrentUser() {
    return this.auth.currentUser!;
  }

  signUp({ email, password, displayName }: LoginModel): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName })));
  }

  signIn({ email, password }: LoginModel) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut() {
    const user = this.auth.currentUser;
    return from(this.auth.signOut()).pipe(
      switchMap(() =>
        this.http.post(`${environment.apiUrl}/revokeStreamUserToken`, { user })
      )
    );
  }
}

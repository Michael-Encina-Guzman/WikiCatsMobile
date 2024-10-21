import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal< UserInterface | null | undefined> (undefined)

  constructor() { }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(response => updateProfile(response.user,{displayName: username}))
    return from(promise);
  }

  login(email : string, password : string) : Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }
}

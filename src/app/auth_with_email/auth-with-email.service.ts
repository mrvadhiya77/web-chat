import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthWithEmailService {

  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  user: User | null = null;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(!!user);
    });
  }

  /**
   * Registers a new user with email and password.
   * Returns a promise that resolves with the user's credentials.
   */
  async registerWithEmail(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = result.user;

      const userDocRef = doc(this.firestore, 'user', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  /**
   * Logs in a user with email and password.
   * Returns a promise that resolves with the user's credentials.
   */
  async loginWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      const user = result.user;

      const userDocRef = doc(this.firestore, 'user', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        observer.next(user);
      }, err => {
        observer.error(err);
      });
    });
  }
}

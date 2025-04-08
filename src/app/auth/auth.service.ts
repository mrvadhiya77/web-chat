/**
 * AuthService provides authentication functionalities using Firebase Authentication.
 * It allows users to sign in with Google and manage authentication state changes.
 * The service is designed to be a singleton, available throughout the Angular application.
 */

import { inject, Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures the service is a singleton and available throughout the app
})
export class AuthService {

  // Inject Firebase Auth and Angular Router services
  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);

  // BehaviorSubject to hold and emit the current user state
  private userSubject = new BehaviorSubject<User | null>(null);

  // Observable for components to subscribe to user state changes
  user$ = this.userSubject.asObservable();

  user : User | null = null;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Listen for authentication state changes and update the userSubject
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);
  });
  }

  /**
   * Initiates a Google sign-in process using a popup.
   * Returns a promise that resolves with the user's credentials.
   */
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      const userDocRef = doc(this.firestore,'user',user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date()
        })
      };
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  /**
   * Signs the user out and navigates to the login page.
   * Returns a promise that resolves when the sign-out process is complete.
   */
  logout() {
    this.isAuthenticatedSubject.next(false);
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }
}
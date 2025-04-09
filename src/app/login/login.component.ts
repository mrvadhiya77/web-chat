/**
 * LoginComponent is responsible for handling user login interactions.
 * It utilizes the AuthService to initiate a Google sign-in process.
 * This component is part of the Angular application and is associated with a template and styles.
 */

import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login', // Defines the custom HTML tag for this component
  standalone:true,
  imports: [], // Placeholder for any additional modules to be imported
  templateUrl: './login.component.html', // Path to the HTML template for this component
  styleUrl: './login.component.css' // Path to the CSS styles for this component
})
export class LoginComponent {
  // Injects the AuthService to handle authentication operations
  authService = inject(AuthService);
  private auth = inject(Auth);
  private router = inject(Router);

  user: User | null = null;

  /**
   * Initiates the login process using Google sign-in.
   * Calls the loginWithGoogle method from AuthService.
   */
  async login() {
    await this.authService.loginWithGoogle().then(()=> {

      // this.router.navigateByUrl('/chatlist', { replaceUrl: true }); // ✅ Navigate after login
      this.router.navigate(['/chatboard']); // ✅ Navigate after login
    }).catch(console.error)
  }
}
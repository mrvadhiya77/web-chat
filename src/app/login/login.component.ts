/**
 * LoginComponent is responsible for handling user login interactions.
 * It utilizes the AuthService to initiate a Google sign-in process.
 * This component is part of the Angular application and is associated with a template and styles.
 */

import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthWithEmailService } from '../auth_with_email/auth-with-email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login', // Defines the custom HTML tag for this component
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf], // Placeholder for any additional modules to be imported
  templateUrl: './login.component.html', // Path to the HTML template for this component
  styleUrl: './login.component.css' // Path to the CSS styles for this component
})
export class LoginComponent {
  loginForm : FormGroup;

  constructor(private authService: AuthWithEmailService, private router: Router, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginWithEmail(email, password).then(() => {
        this.router.navigateByUrl('/chatboard', { replaceUrl: true });
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.router.navigateByUrl('/register', { replaceUrl: true });
        } else {
          console.error('Login failed', error);
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
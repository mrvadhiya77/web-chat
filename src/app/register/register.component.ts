import { Component } from '@angular/core';
import { AuthWithEmailService } from '../auth_with_email/auth-with-email.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthWithEmailService, private router: Router,private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      form.setErrors({ mismatch: true });
    } else {
      form.setErrors(null);
    }
  }

  register() {
    if (this.registerForm.valid) {
      const { email, confirmPassword } = this.registerForm.value;
      this.authService.registerWithEmail(email, confirmPassword).then(() => {
        this.registerForm.reset();
      });
    }
  }
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}

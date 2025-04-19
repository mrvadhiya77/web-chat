import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chatboard', component: MainWindowComponent, canActivate: [AuthGuard] }, // Chat app as default route
  { path: '**', redirectTo: '' } // Wildcard redirect to chat app
];

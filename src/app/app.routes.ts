import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { MainWindowComponent } from './main-window/main-window.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chatboard', component: MainWindowComponent, canActivate: [AuthGuard] }, // Chat app as default route
  { path: '**', redirectTo: '' } // Wildcard redirect to chat app
];

import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { LoginComponent } from "./login/login.component";
import { NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = "Chat Application";
  isAuthenticated: boolean = false;
  authService = inject(AuthService);
  constructor(private firestore:Firestore) {
    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  addMessage(){
    const messageRef = collection(this.firestore, 'messages');

    addDoc(messageRef, {text:'Hello Firebase', createdAt: new Date()}).then(() => console.log("Message Added!")).catch(error => console.log('Error: ',error));
  }
}

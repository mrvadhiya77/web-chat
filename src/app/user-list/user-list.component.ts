import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat/chat.service';
import { NgFor } from '@angular/common';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user-list',
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUserId: string = "";

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private sharedService : SharedService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.chatService.getUsers(this.currentUserId).subscribe(users => {
          this.users = users;
        });
      }
    });
  }

  startChat(user: User) {
    this.sharedService.setReceiverId(user.uid);
  }
}

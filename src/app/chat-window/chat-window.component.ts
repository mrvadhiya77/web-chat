import { Component } from '@angular/core';
import { Message } from '../../model/message.model';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat/chat.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-chat-window',
  imports: [NgClass, FormsModule, NgFor],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
  messages: Message[] = [];
  currentUserId: string = '';
  receiverId: string = ''; // Set this when a user is selected
  newMessage: string = '';

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private sharedService : SharedService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.sharedService.receiverId$.subscribe(receiverId => {
          this.receiverId = receiverId;
          if (this.receiverId) {
            this.loadMessages();
          }
        });
      }
    });

  }

  loadMessages() {
    this.chatService.getMessages(this.currentUserId, this.receiverId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.receiverId) {
      this.chatService.sendMessage(this.currentUserId, this.receiverId, this.newMessage);
      this.newMessage = '';
    }
  }
}

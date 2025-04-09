import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { Message } from '../../model/message.model';
import { addDoc, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore, private auth: AuthService) {}

  // Get all users except the current user
  getUsers(currentUserId: string): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uid', '!=', currentUserId));
    return new Observable(observer => {
      onSnapshot(q, snapshot => {
        const users = snapshot.docs.map(doc => doc.data() as User);
        observer.next(users);
      }, err => observer.error(err));
    });
  }

  // Get messages between two users
  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(
      messagesRef,
      where('senderId', 'in', [senderId, receiverId]),
      where('receiverId', 'in', [senderId, receiverId]),
      orderBy('timestamp', 'asc')
    );
    return new Observable(observer => {
      onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => doc.data() as Message);
        observer.next(messages);
      }, err => observer.error(err));
    });
  }

  // Send a message
  sendMessage(senderId: string, receiverId: string, message: string) {
    const messagesRef = collection(this.firestore, 'messages');
    return addDoc(messagesRef, {
      senderId,
      receiverId,
      message,
      timestamp: new Date() // Use serverTimestamp() if you import it
    });
  }
}

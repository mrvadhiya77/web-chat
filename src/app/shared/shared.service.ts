import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private receiverIdSource = new BehaviorSubject<string>('');
  receiverId$ = this.receiverIdSource.asObservable();

  setReceiverId(id: string) {
    this.receiverIdSource.next(id);
  }
}

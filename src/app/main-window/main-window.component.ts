import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-main-window',
  imports: [UserListComponent, ChatWindowComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent {

}

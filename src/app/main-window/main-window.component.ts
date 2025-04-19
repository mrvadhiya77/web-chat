import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-window',
  imports: [UserListComponent, ChatWindowComponent, NgIf],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent {
  isSidebarVisible = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

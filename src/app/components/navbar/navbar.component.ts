import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor() {}

  ngDoCheck(): void {
    this.isUser = localStorage.getItem('role') === 'USER' ? true : false;
    this.isAdmin = localStorage.getItem('role') === 'ADMIN' ? true : false;
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.removeItem('userNames');
  }
}

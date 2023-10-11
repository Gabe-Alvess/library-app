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
    this.isUser = sessionStorage.getItem('Role') === 'USER' ? true : false;
    this.isAdmin = sessionStorage.getItem('Role') === 'ADMIN' ? true : false;
  }

  logout(): void {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem('First Name');
    sessionStorage.removeItem('Last Name');
  }
}

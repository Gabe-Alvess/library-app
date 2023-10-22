import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    this.isUser = this.authService.isUser();
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {
    localStorage.clear();
  }
}

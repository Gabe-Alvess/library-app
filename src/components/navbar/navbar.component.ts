import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  isUser: boolean = false;
  isAdmin: boolean = false;
  isLoggedIn = false;
  alreadyLoggedIn = false;

  firstName: string = '';
  lastName: string = '';
  showMessage = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private location: Location,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.isUser = this.authService.isUser();
    this.isAdmin = this.authService.isAdmin();
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    this.isLoggedIn = this.authService.getLoginStatus();

    if (this.isLoggedIn && !this.alreadyLoggedIn) {
      this.findUserInfo();
    }

    this.alreadyLoggedIn = this.isLoggedIn;
  }

  findUserInfo() {
    const email = localStorage.getItem('Email');

    if (email) {
      this.userService.getUserInfo(email).subscribe({
        next: (response: any) => {
          this.firstName = response.firstName;
          this.lastName = response.lastName;

          this.dataService.setFailedToConnect(false);
        },
        error: (errorResponse) => {
          console.log('home error', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.router.navigate(['error-page']);
        },
      });
    } else {
      console.log('Email Not Found!!!');
    }
  }

  scrollToCatalog() {
    const currentUrl = this.location.path();

    if (currentUrl.length !== 0) {
      this.router.navigate(['/']);

      setTimeout(() => {
        const catalog = document.querySelector('#catalog');

        if (catalog) {
          catalog.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const catalog = document.querySelector('#catalog');

      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToHome() {
    const home = document.querySelector('#home');

    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout(): void {
    localStorage.clear();
  }
}

import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements DoCheck {
  isLoggedIn = false;
  alreadyLoggedIn = false;

  firstName: string = '';
  lastName: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngDoCheck(): void {
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
}

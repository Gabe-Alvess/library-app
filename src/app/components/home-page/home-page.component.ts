import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = false;

  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngDoCheck(): void {
    const token = sessionStorage.getItem('Token');
    this.isLoggedIn = token ? true : false;
  }

  ngOnInit(): void {
    const firstNameFound = sessionStorage.getItem('First Name');
    const lastNameFound = sessionStorage.getItem('Last Name');

    if (firstNameFound && lastNameFound) {
      this.firstName = sessionStorage.getItem('First Name') as string;
      this.lastName = sessionStorage.getItem('Last Name') as string;
    } else {
      this.findUserNames();
    }
  }

  findUserNames() {
    const token = sessionStorage.getItem('Token');

    if (token) {
      this.email = sessionStorage.getItem('Email') as string;

      this.userService.getUserName(this.email).subscribe({
        next: (response: any) => {
          this.firstName = response.firstName;
          this.lastName = response.lastName;

          sessionStorage.removeItem('First Name');
          sessionStorage.removeItem('Last Name');

          sessionStorage.setItem('First Name', response.firstName);
          sessionStorage.setItem('Last Name', response.lastName);

          this.dataService.setFailedToConnect(false);
        },
        error: (errorResponse) => {
          console.log('home error', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.dataService.setErrorName(errorResponse.name);
          this.router.navigate(['error-page']);
        },
      });
    }
  }
}

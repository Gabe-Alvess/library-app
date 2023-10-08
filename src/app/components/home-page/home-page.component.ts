import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string = '';

  user = {
    firstName: '',
    lastName: '',
  };

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.email = localStorage.getItem('email') as string;

      this.userService.getUserName(this.email).subscribe({
        next: (response: any) => {
          this.user = response;
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

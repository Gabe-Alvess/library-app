import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  success: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.success = true;
        this.dataService.setFailedToConnect(false);
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error: (errorResponse) => {
        console.error('Signup error: ', errorResponse);
        this.success = false;
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(errorResponse.status);
        this.dataService.setErrorName(errorResponse.error.error);
        this.router.navigate(['error-page']);
      },
    });

    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }
}

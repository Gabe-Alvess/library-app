import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  userInfo = {
    email: '',
    password: '',
  };

  incorrectLogin: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.userInfo).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('Token', response.token);
        sessionStorage.setItem('Email', response.email);
        sessionStorage.setItem('Role', response.role);
        this.dataService.setFailedToConnect(false);
        this.router.navigate(['']);
      },
      error: (errorResponse) => {
        if (errorResponse.status === 400) {
          this.message = 'Invalid username or password!';
          this.showErrorMessage();
        } else if (errorResponse.status === 404) {
          this.message = 'You must have an account to login!';
          this.showErrorMessage();
        } else {
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.dataService.setErrorName(errorResponse.error);
          this.router.navigate(['error-page']);
        }
      },
    });

    this.userInfo = {
      email: '',
      password: '',
    };
  }

  showErrorMessage() {
    this.incorrectLogin = true;
    setTimeout(() => {
      this.incorrectLogin = false;
    }, 5000);
  }
}

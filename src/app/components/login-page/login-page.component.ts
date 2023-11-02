import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userInfo = {
    email: '',
    password: '',
  };

  invalid = false;
  notFound = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getLoginStatus()) {
      this.router.navigate(['']);
    }
  }

  submit() {
    this.authService.login(this.userInfo).subscribe({
      next: (response: any) => {
        this.handleSuccessfulResponse(response);
      },
      error: (errorResponse) => {
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  handleSuccessfulResponse(response: any) {
    localStorage.setItem('Token', response.token);
    localStorage.setItem('Email', response.email);
    localStorage.setItem('Role', response.role);

    this.dataService.setFailedToConnect(false);
    this.router.navigate(['']);
  }

  handleErrorResponse(errorResponse: any) {
    if (errorResponse.status === 400) {
      this.invalid = true;
      this.showErrorMessage();
    } else if (errorResponse.status === 404) {
      this.notFound = true;
      this.showErrorMessage();
    } else {
      console.log('login error: ', errorResponse);
      this.dataService.setFailedToConnect(true);
      this.dataService.setErrorCode(errorResponse.status);
      this.router.navigate(['error-page']);
    }
  }

  showErrorMessage() {
    if (this.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid username or password!',
      });
      this.invalid = false;
    }

    if (this.notFound) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must have an account to login!',
      });
      this.notFound = false;
    }
  }
}

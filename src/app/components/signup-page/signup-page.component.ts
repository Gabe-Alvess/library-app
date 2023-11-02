import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

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
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.handleSuccessfulResponse();
      },
      error: (errorResponse) => {
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  handleSuccessfulResponse() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Account Successfully Registered!',
    });
    this.dataService.setFailedToConnect(false);
  }

  handleErrorResponse(errorResponse: any) {
    if (errorResponse.status === 400) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Account Already Exists!',
      });
    } else {
      console.error('Signup error: ', errorResponse);
      this.dataService.setFailedToConnect(true);
      this.dataService.setErrorCode(errorResponse.status);
      this.router.navigate(['error-page']);
    }
  }
}

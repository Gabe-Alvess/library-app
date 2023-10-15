import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers: [MessageService],
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
    private messageService: MessageService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account successfully registered!',
        });
        this.dataService.setFailedToConnect(false);
      },
      error: (errorResponse) => {
        console.error('Signup error: ', errorResponse);
        this.success = false;
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(errorResponse.status);
        this.dataService.setErrorName(errorResponse.error);
        this.router.navigate(['error-page']);
      },
    });

    this.user = {} as User;
  }
}

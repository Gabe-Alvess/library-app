import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  connectionFailed = false;
  notAllowed = false;
  errorCode = -1;

  constructor(
    private messageService: MessageService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connectionError();
    this.notAllowedError();
    if (!this.connectionFailed && !this.notAllowed) {
      this.router.navigate(['']);
    }
  }

  getErrorName(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'BAD REQUEST!';
      case 401:
        return 'UNAUTHORIZED!';
      case 403:
        return 'FORBIDDEN!';
      case 404:
        return 'NOT FOUND!';
      case 422:
        return 'UNPROCESSABLE ENTITY!';
      default:
        return 'UNKNOWN ERROR!';
    }
  }

  connectionError() {
    this.dataService.getErrorCode().subscribe((code) => {
      this.errorCode = code;
    });

    this.dataService.getFailedToConnect().subscribe((boolean) => {
      this.connectionFailed = boolean;
    });

    if (this.connectionFailed) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR:',
          detail: `${this.errorCode} | ${this.getErrorName(this.errorCode)}`,
        });
      }, 1);
    }
  }

  notAllowedError() {
    this.dataService.getNotAllowed().subscribe((boolean) => {
      this.notAllowed = boolean;
    });

    if (this.notAllowed) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR:',
          detail: `401 | ${this.getErrorName(401)} | NO USERS ALLOWED!`,
        });
      }, 1);
    }
  }
}

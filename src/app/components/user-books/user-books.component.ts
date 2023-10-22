import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { BorrowedBook } from 'src/app/interfaces/BorrowedBook';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
})
export class UserBooksComponent implements OnInit {
  borrowedBooks: BorrowedBook[] = [];

  noBooksYet = false;
  bookRenewed = false;
  alreadyRenewed = false;
  bookReturned = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    const email = localStorage.getItem('Email');

    if (email) {
      this.userService.getBorrowedBooks(email).subscribe({
        next: (response: BorrowedBook[]) => {
          this.borrowedBooks = response;
          this.dataService.setFailedToConnect(false);
        },
        error: (responseError) => {
          if (responseError.status === 404) {
            this.noBooksYet = true;
          } else {
            console.error('Get user books error: ', responseError);
            this.dataService.setFailedToConnect(true);
            this.dataService.setErrorCode = responseError.status;
            this.router.navigate(['error-page']);
          }
        },
      });
    } else {
      console.log('Email Not Found! Get Borrowed Books');
    }
  }

  renewDueDate(bookId: number, renewed: boolean) {
    if (!renewed) {
      const email = localStorage.getItem('Email');

      if (email) {
        this.userService.renewDueDate(email, bookId).subscribe({
          next: () => {
            this.bookRenewed = true;
            this.getBorrowedBooks();
            this.showMessage();
            this.dataService.setFailedToConnect(false);
          },
          error: (errorResponse) => {
            console.error('Renew error', errorResponse);
            this.dataService.setFailedToConnect(true);
            this.dataService.setErrorCode(errorResponse.status);
            this.router.navigate(['error-page']);
          },
        });
      } else {
        console.log('Email Not Found! Renew Due Date');
      }
    } else {
      this.alreadyRenewed = true;
      this.showMessage();
    }
  }

  returnBook(bookId: number) {
    const email = localStorage.getItem('Email');

    if (email) {
      this.userService.returnBook(email, bookId).subscribe({
        next: () => {
          this.bookReturned = true;
          this.getBorrowedBooks();
          this.showMessage();
          this.dataService.setFailedToConnect(false);
        },
        error: (errorResponse) => {
          console.error('Return error', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.router.navigate(['error-page']);
        },
      });
    } else {
      console.log('Email Not Found! Return Book');
    }
  }

  showMessage() {
    if (this.bookRenewed) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Due Date Successfully Renewed!',
      });
      this.bookRenewed = false;
    }

    if (this.alreadyRenewed) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Due Date Already Renewed!',
      });
      this.alreadyRenewed = false;
    }

    if (this.bookReturned) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book Successfully Returned!',
      });
      this.bookReturned = false;
    }
  }
}

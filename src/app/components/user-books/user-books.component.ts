import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { BorrowedBook } from 'src/app/interfaces/BorrowedBook';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
  providers: [MessageService],
})
export class UserBooksComponent implements OnInit, DoCheck {
  borrowedBooks: BorrowedBook[] = [];

  noBooksYet = false;
  bookRenewed = false;
  alreadyRenewed = false;
  bookReturned = false;
  updateTable = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorrowedBooks();
  }

  ngDoCheck(): void {
    if (this.updateTable) {
      this.getBorrowedBooks();
    }

    this.updateTable = false;
  }

  getBorrowedBooks() {
    const email = sessionStorage.getItem('Email');

    if (email) {
      this.userService.getBorrowedBooks(email).subscribe({
        next: (response: BorrowedBook[]) => {
          console.log('response: ', response);
          this.borrowedBooks = response;
          console.log('bBooks: ', this.borrowedBooks);
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

  renewDueDate(bookId: number, renewed: boolean) {
    if (!renewed) {
      const email = sessionStorage.getItem('Email');

      if (email) {
        this.userService.renewDueDate(email, bookId).subscribe({
          next: () => {
            this.bookRenewed = true;
            this.updateTable = true;
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
        return;
      }
    } else {
      this.alreadyRenewed = true;
      this.showMessage();
    }
  }

  returnBook(bookId: number) {
    const email = sessionStorage.getItem('Email');

    if (email) {
      this.userService.returnBook(email, bookId).subscribe({
        next: () => {
          this.bookReturned = true;
          this.updateTable = true;
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
    }
  }
}

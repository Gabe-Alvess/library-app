import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
  providers: [MessageService],
})
export class BookPageComponent implements OnInit {
  book: Book = {} as Book;
  success: boolean = false;
  notLoggedIn: boolean = false;
  notAvailable: boolean = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentBook = sessionStorage.getItem('Book');

    if (currentBook) {
      this.book = JSON.parse(currentBook);
    }

    this.getBook();
  }

  getBook() {
    this.dataService.getBook().subscribe((clickedBook) => {
      if (clickedBook !== undefined) {
        this.book = clickedBook;
        sessionStorage.removeItem('Book');
        sessionStorage.setItem('Book', JSON.stringify(clickedBook));
      }
    });
  }

  borrowBook() {
    const token = sessionStorage.getItem('Token');
    const email = sessionStorage.getItem('Email') as string;

    if (token) {
      this.userService.borrowBook(email, this.book.id).subscribe({
        next: () => {
          this.success = true;
          this.showMessage();
          this.dataService.setFailedToConnect(false);
        },
        error: (errorResponse) => {
          console.log('borrowBook Error: ', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.dataService.setErrorName(errorResponse.error.error);
          this.router.navigate(['error-page']);
        },
      });
    } else {
      this.notLoggedIn = true;
      this.showMessage();
    }
  }

  updateAvailability() {
    this.bookService.findBook(this.book.id).subscribe({
      next: (response) => {
        this.book = response;
        this.dataService.setBook(this.book);
        this.dataService.setFailedToConnect(false);
      },
      error: (errorResponse) => {
        console.log('updatePage error: ', errorResponse);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(errorResponse.status);
        this.dataService.setErrorName(errorResponse.error.error);
        this.router.navigate(['error-page']);
      },
    });
  }

  bookNotAvailable() {
    this.notAvailable = true;
    this.showMessage();
  }

  showMessage() {
    if (this.notLoggedIn) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Login required to borrow a book!',
      });
      this.notLoggedIn = false;
    }

    if (this.success) {
      this.updateAvailability();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book successfully borrowed!',
      });
      this.success = false;
    }

    if (this.notAvailable) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Book not available for borrowing!',
      });
      this.notAvailable = false;
    }
  }
}

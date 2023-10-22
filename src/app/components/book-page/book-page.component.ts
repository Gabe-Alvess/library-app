import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  book: Book = {
    id: 0,
    imgURL: '',
    title: '',
    author: '',
    genres: '',
    description: '',
    releaseDate: '',
    available: true,
  };

  success = false;
  notLoggedIn = false;
  notAvailable = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedBook = sessionStorage.getItem('Book');

    if (storedBook) {
      this.book = JSON.parse(storedBook);
    }

    this.getBookData();
  }

  getBookData() {
    this.dataService.getBookId().subscribe((bookId) => {
      const idToFetch = bookId !== 0 ? bookId : this.book.id;

      this.getBookById(idToFetch);
    });
  }

  getBookById(bookId: number) {
    this.bookService.findBook(bookId).subscribe({
      next: (response) => {
        this.handleSuccessfulResponse(response);
      },
      error: (errorResponse) => {
        console.log('Book Page Error: ', errorResponse);
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  borrowBook() {
    const email = localStorage.getItem('Email');

    if (this.authService.getLoginStatus()) {
      if (email) {
        this.userService.borrowBook(email, this.book.id).subscribe({
          next: () => {
            this.success = true;
            this.showMessage();
            this.getBookById(this.book.id);
            this.dataService.setFailedToConnect(false);
          },
          error: (errorResponse) => {
            console.log('borrowBook Error: ', errorResponse);
            this.handleErrorResponse(errorResponse);
          },
        });
      } else {
        console.log('Email Not Found!');
      }
    } else {
      this.notLoggedIn = true;
      this.showMessage();
    }
  }

  handleSuccessfulResponse(response: any) {
    this.book = response;
    sessionStorage.setItem('Book', JSON.stringify(response));
    this.dataService.setFailedToConnect(false);
  }

  handleErrorResponse(errorResponse: any) {
    this.dataService.setFailedToConnect(true);
    this.dataService.setErrorCode(errorResponse.status);
    this.router.navigate(['error-page']);
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

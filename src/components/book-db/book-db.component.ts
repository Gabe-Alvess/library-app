import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/interfaces/Book';
import { AdminService } from 'src/service/admin.service';
import { BookService } from 'src/service/book.service';
import { DataService } from 'src/service/data.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/service/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-db',
  templateUrl: './book-db.component.html',
  styleUrls: ['./book-db.component.css'],
})
export class BookDbComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  deleted = false;
  updated = false;
  noBooksFound = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private adminService: AdminService,
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.isAllowed();
    }

    this.getAllBooks();
    this.getUpdateStatus();
  }

  getAllBooks() {
    this.bookService.findBooks().subscribe({
      next: (response: Book[]) => {
        this.handleSuccessfulResponse(response);
      },
      error: (errorResponse) => {
        console.error('Get all books BooksDb error: ', errorResponse);
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  updateBook(book: Book) {
    this.dataService.setBook(book);
    this.router.navigate(['update-book']);
  }

  getUpdateStatus() {
    this.dataService
      .isUpdateSucceeded()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((boolean) => {
        this.updated = boolean;
        this.showMessage();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe({
      next: () => {
        this.deleted = true;
        this.showMessage();

        this.getAllBooks();

        this.dataService.setFailedToConnect(false);
      },
      error: (errorResponse) => {
        console.error('Delete error', errorResponse);
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  handleSuccessfulResponse(response: any) {
    this.books = response;

    this.books.length === 0
      ? (this.noBooksFound = true)
      : (this.noBooksFound = false);

    this.dataService.setFailedToConnect(false);
  }

  handleErrorResponse(errorResponse: any) {
    this.dataService.setFailedToConnect(true);
    this.dataService.setErrorCode(errorResponse.status);
    this.router.navigate(['error-page']);
  }

  showMessage() {
    if (this.deleted) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book Successfully Deleted!',
      });

      this.deleted = false;
    }

    if (this.updated) {
      this.dataService.setUpdateSucceeded(false);

      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book Successfully Updated!',
        });
      }, 1);

      this.updated = false;
    }
  }
}

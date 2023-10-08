import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-book-db',
  templateUrl: './book-db.component.html',
  styleUrls: ['./book-db.component.css'],
})
export class BookDbComponent implements OnInit {
  books: Book[] = [];
  noBooksFound = false;

  constructor(
    private adminService: AdminService,
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.findBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;

        this.books.length === 0
          ? (this.noBooksFound = true)
          : (this.noBooksFound = false);

        this.dataService.setFailedToConnect(false);
      },
      error: (responseError) => {
        console.error('Get error: ', responseError);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode = responseError.status;
        this.dataService.setErrorName = responseError.error.error;
        this.router.navigate(['error-page']);
      },
    });
  }

  updateBook(id: number) {
    this.dataService.setBookId(id);
    this.router.navigate(['update-book']);
  }

  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe({
      next: () => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['book-db']);
          });
        this.dataService.setFailedToConnect(false);
      },
      error: (errorResponse) => {
        console.error('Delete error', errorResponse);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(errorResponse.status);
        this.dataService.setErrorName(errorResponse.error.error);
        this.router.navigate(['error-page']);
      },
    });
  }
}

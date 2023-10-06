import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
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

  notDeleted: boolean = false;
  message: string = '';

  constructor(
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
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.notDeleted = false;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['book-db']);
          });
      },
      error: (error) => {
        this.notDeleted = true;
        this.message = `Status: ${error.status} An error occurred!`;
        console.error('Delete error', error);
      },
    });
  }
}

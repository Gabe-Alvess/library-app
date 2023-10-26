import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/interfaces/Book';
import { BookService } from 'src/service/book.service';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css'],
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = [];
  paginatedBooks: Book[] = [];
  noBooksFound = false;

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
        this.handleSuccessfulResponse(response);
      },
      error: (errorResponse) => {
        console.error('Get all books BooksDb error: ', errorResponse);
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  handleSuccessfulResponse(response: any) {
    this.books = response;

    this.paginatedBooks = this.books.slice(0, 15);

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

  transferBookId(bookId: number) {
    this.dataService.setBookId(bookId);
    this.router.navigate(['book-page']);
  }

  adjustScroll() {
    const catalog = document.querySelector('#catalog');

    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  }

  paginate(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);

    setTimeout(() => {
      this.adjustScroll();
    }, 0);
  }
}

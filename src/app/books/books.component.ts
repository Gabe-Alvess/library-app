import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../interfaces/Book';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  updateBook(book: Book) {
    setTimeout(() => {
      this.dataService.setBook(book);
    },1)
  }

  ngOnInit(): void {
    this.dataService.searchInput$.subscribe((search) => {
      if (search.trim().length > 0) {
        this.bookService.searchForBooks(search).subscribe({
          next: (response: Book[]) => {
            this.books = response;

            if (this.books.length === 0) {
              this.dataService.setNotFound(true);
              this.router.navigate(['error-page']);
            } else {
              this.dataService.setNotFound(false);
            }

            this.dataService.setFailedToConnect(false);

            console.log(this.books);
          },
          error: (responseError) => {
            console.error('Get error: ', responseError);
            this.dataService.setFailedToConnect(true);
            this.dataService.setErrorCode(responseError.status);
            this.dataService.setErrorName(responseError.error.error);
            this.router.navigate(['error-page']);
          },
        });
      }
    });
  }
}

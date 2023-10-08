import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  updateBook(book: Book) {
    this.dataService.setBook(book);
  }

  ngOnInit(): void {
    const storedSearch = sessionStorage.getItem('lastSearch');

    if (storedSearch) {
      this.books = JSON.parse(storedSearch);
    }

    this.dataService.getSearchInput().subscribe((search) => {
      if (search.trim().length > 0) {
        this.bookService.searchForBooks(search).subscribe({
          next: (response: Book[]) => {
            this.books = response;

            if (this.books.length === 0) {
              this.dataService.setNotFound(true);
              this.router.navigate(['error-page']);
            } else {
              this.dataService.setNotFound(false);
              sessionStorage.removeItem('lastSearch');
              sessionStorage.setItem('lastSearch', JSON.stringify(response));
            }

            this.dataService.setFailedToConnect(false);

            console.log(this.books);
          },
          error: (errorResponse) => {
            console.error('Search error: ', errorResponse);
            this.dataService.setFailedToConnect(true);
            this.dataService.setErrorCode(errorResponse.status);
            this.dataService.setErrorName(errorResponse.error.error);
            this.router.navigate(['error-page']);
          },
        });
      }
    });
  }
}

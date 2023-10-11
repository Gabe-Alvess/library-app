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
    this.search();
  }

  // TODO: Bring the book not not found message back to the search page!!!

  search() {
    this.dataService.getSearchInput().subscribe((search) => {
      if (search.trim().length > 0) {
        this.bookService.searchForBooks(search).subscribe({
          next: (response: Book[]) => {
            this.books = response;

            this.dataService.setNotFound(false);
            sessionStorage.removeItem('Last Search');
            sessionStorage.setItem('Last Search', JSON.stringify(response));

            this.dataService.setSearchInput('');
            this.dataService.setFailedToConnect(false);
          },

          error: (errorResponse) => {
            if (errorResponse.status === 404) {
              this.dataService.setNotFound(true);
              this.dataService.setSearchInput('');
              this.router.navigate(['error-page']);
            } else {
              console.error('Search error: ', errorResponse);
              this.dataService.setSearchInput('');
              this.dataService.setFailedToConnect(true);
              this.dataService.setErrorCode(errorResponse.status);
              this.dataService.setErrorName(errorResponse.error.error);
              this.router.navigate(['error-page']);
            }
          },
        });
      } else {
        const storedSearch = sessionStorage.getItem('Last Search');

        if (storedSearch) {
          this.books = JSON.parse(storedSearch);
        }
      }
    });
  }
}

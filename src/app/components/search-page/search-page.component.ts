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
  notFound = false;

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForBook();
  }

  transferBookId(bookId: number) {
    this.dataService.setBookId(bookId);
    this.router.navigate(['book-page']);
  }

  searchForBook() {
    this.dataService.getSearchInput().subscribe((search) => {
      this.handleSearch(search);
    });
  }

  handleSearch(search: string) {
    if (search.trim().length > 0) {
      this.bookService.searchForBooks(search).subscribe({
        next: (response: Book[]) => {
          this.handleSuccessfulResponse(response);
        },

        error: (errorResponse) => {
          this.handleErrorResponse(errorResponse);
        },
      });
    } else {
      const storedSearch = sessionStorage.getItem('Last Search');

      if (storedSearch) {
        this.books = JSON.parse(storedSearch);
      }
    }
  }

  handleSuccessfulResponse(response: any) {
    this.books = response;

    this.notFound = false;
    sessionStorage.removeItem('Last Search');
    sessionStorage.setItem('Last Search', JSON.stringify(response));

    this.dataService.setSearchInput('');
    this.dataService.setFailedToConnect(false);
  }

  handleErrorResponse(errorResponse: any) {
    if (errorResponse.status === 404) {
      this.notFound = true;
      this.dataService.setSearchInput('');
    } else {
      console.error('Search error: ', errorResponse);
      this.dataService.setSearchInput('');
      this.dataService.setFailedToConnect(true);
      this.dataService.setErrorCode(errorResponse.status);
      this.router.navigate(['error-page']);
    }
  }
}

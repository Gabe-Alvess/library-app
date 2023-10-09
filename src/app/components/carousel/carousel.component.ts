import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  updateBook(book: Book) {
    this.dataService.setBook(book);
    this.router.navigate(['book-page']);
  }

  ngOnInit(): void {
    /* TODO: Find a way to check if the there are no updates in the popular books list! 
      So that there is no need to make a request every time.
    */

    // const popularBooks = sessionStorage.getItem('popularBooks');

    // if (popularBooks) {
    //   this.books = JSON.parse(popularBooks);

    // } else {
    this.findPopularBooks();
    // }
  }

  findPopularBooks() {
    this.bookService.findPopularBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.dataService.setFailedToConnect(false);
        // sessionStorage.removeItem('popularBooks');
        // sessionStorage.setItem('popularBooks', JSON.stringify(response));
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
}

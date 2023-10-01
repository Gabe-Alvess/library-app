import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/Book';
import { BookService } from '../service/book.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

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

  updateBookId(bookId: number) {
    this.dataService.setBookId(bookId)
  }

  ngOnInit(): void {
    this.bookService.findPopularBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
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
}

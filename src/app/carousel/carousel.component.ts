import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/Book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  books: Book[] = [];

  failed: boolean = false;
  errorCode: string = '';
  errorName: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.findPopularBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.failed = false;
        console.log(this.books);
      },
      error: (responseError) => {
        console.error('Get error: ', responseError);
        this.failed = true;
        this.errorCode = responseError.status;
        this.errorName = responseError.error.error;
      },
    });
  }
}

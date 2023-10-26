import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/interfaces/Book';
import { BookService } from 'src/service/book.service';
import { DataService } from 'src/service/data.service';

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

  transferBookId(bookId: number) {
    this.dataService.setBookId(bookId);
    this.router.navigate(['book-page']);
  }

  ngOnInit(): void {
    this.findPopularBooks();
  }

  findPopularBooks() {
    this.bookService.findPopularBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.dataService.setFailedToConnect(false);
      },
      error: (responseError) => {
        console.error('Get error: ', responseError);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(responseError.status);
        this.router.navigate(['error-page']);
      },
    });
  }
}

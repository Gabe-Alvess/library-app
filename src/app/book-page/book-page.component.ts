import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/Book';
import { BookService } from '../service/book.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  book?: Book;

  constructor(
    private dataService: DataService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.bookId$.subscribe((id) => {
      this.bookService.findBook(id).subscribe({
        next: (response: Book) => {
          this.book = response;
          this.dataService.setFailedToConnect(false);
          console.log(this.book);
        },
        error: (responseError) => {
          console.error('Get error: ', responseError);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(responseError.status);
          this.dataService.setErrorName(responseError.error.error);
          this.router.navigate(['error-page']);
        },
      });
    });
  }
}

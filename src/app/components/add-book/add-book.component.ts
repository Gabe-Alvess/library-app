import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  newBook?: Book;
  failed: boolean = false;
  errorCode: string = '';
  errorName: string = '';

  book: Book = {} as Book;

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next: (response: Book) => {
        this.newBook = response;
        this.dataService.setFailedToConnect(false);
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

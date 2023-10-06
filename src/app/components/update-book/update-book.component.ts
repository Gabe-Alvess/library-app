import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  updatedBook?: Book;
  failed: boolean = false;
  errorCode: string = '';
  errorName: string = '';

  book: Book = {
    id: 0,
    imgURL: '',
    title: '',
    author: '',
    description: '',
    genres: '',
    releaseDate: '',
  };

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.dataService.getBookId().subscribe((id) => {
      this.bookService.updateBook(id, this.book).subscribe({
        next: (response: Book) => {
          this.updatedBook = response;
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
    });

    this.book = {} as Book;
  }
}

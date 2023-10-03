import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
})
export class UserBooksComponent {
  constructor(
    private bookService: BookService,
    private dataService: DataService,
    router: Router
  ) {}

  returnBook() {}

  renewBook() {}
}

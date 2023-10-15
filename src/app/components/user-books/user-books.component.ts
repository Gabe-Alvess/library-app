import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
})
export class UserBooksComponent implements OnInit {
  borrowedBooks = [
    {
      img: '',
      title: '',
      borrowDate: '',
      dueDate: '',
    },
  ];

  borrowedBook = [];

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getBorrowedBooks() {}

  returnBook() {}

  renewBook() {}
}

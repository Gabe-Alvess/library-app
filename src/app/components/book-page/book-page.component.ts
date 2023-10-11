import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  book?: Book;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    const storedBook = sessionStorage.getItem('Selected Book');

    if (storedBook) {
      this.book = JSON.parse(storedBook);
    }

    this.dataService.getBook().subscribe((clickedBook) => {
      if (clickedBook !== undefined) {
        this.book = clickedBook;

        sessionStorage.removeItem('Selected Book');
        sessionStorage.setItem('Selected Book', JSON.stringify(clickedBook));
      }
    });
  }

  borrowBook() {}
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/Book';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  book?: Book;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    const storedBook = localStorage.getItem('selectedBook');

    this.dataService.book$.subscribe((clickedBook) => {
      if (clickedBook !== undefined) {
        this.book = clickedBook;

        localStorage.removeItem('selectedBook');
        localStorage.setItem('selectedBook', JSON.stringify(clickedBook));
      }
    });

    if (storedBook) {
      this.book = JSON.parse(storedBook);
    }
  }
}

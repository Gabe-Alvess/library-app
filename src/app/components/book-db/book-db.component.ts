import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-db',
  templateUrl: './book-db.component.html',
  styleUrls: ['./book-db.component.css'],
  providers: [MessageService],
})
export class BookDbComponent implements OnInit, DoCheck {
  books: Book[] = [];
  deleted = false;
  updateTable = false;
  noBooksFound = false;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  ngDoCheck(): void {
    if (this.updateTable) {
      this.getAllBooks();
    }

    this.updateTable = false;
  }

  getAllBooks() {
    this.bookService.findBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;

        this.books.length === 0
          ? (this.noBooksFound = true)
          : (this.noBooksFound = false);

        this.dataService.setFailedToConnect(false);
      },
      error: (responseError) => {
        console.error('Get db books error: ', responseError);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode = responseError.status;
        this.router.navigate(['error-page']);
      },
    });
  }

  updateBook(id: number) {
    this.dataService.setBookId(id);
    this.router.navigate(['update-book']);
  }

  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe({
      next: () => {
        this.deleted = true;
        this.showMessage();

        this.updateTable = true;

        this.dataService.setFailedToConnect(false);
      },
      error: (errorResponse) => {
        console.error('Delete error', errorResponse);
        this.dataService.setFailedToConnect(true);
        this.dataService.setErrorCode(errorResponse.status);
        this.router.navigate(['error-page']);
      },
    });
  }

  showMessage() {
    if (this.deleted) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book successfully deleted!',
      });
      this.deleted = false;
    }
  }
}

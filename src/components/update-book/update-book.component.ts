import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/interfaces/Book';
import { AdminService } from 'src/service/admin.service';
import { DataService } from 'src/service/data.service';
import { BookDbComponent } from '../book-db/book-db.component';
import { AuthService } from 'src/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  book: Book = {
    id: 0,
    imgURL: '',
    title: '',
    author: '',
    description: '',
    genres: '',
    releaseDate: '',
    available: false,
  };

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private dataService: DataService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAllowed()) {
        this.getBookToUpdate();
      }
    }
  }

  getBookToUpdate() {
    this.dataService.getBook().subscribe((bookToUpdate) => {
      if (bookToUpdate !== undefined) {
        this.book = bookToUpdate;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  submit() {
    this.adminService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        this.handleSuccessfulResponse();
      },
      error: (errorResponse) => {
        console.error('Update error: ', errorResponse);
        this.handleErrorResponse(errorResponse);
      },
    });
  }

  handleSuccessfulResponse() {
    this.dataService.setUpdateSucceeded(true);
    this.dataService.setFailedToConnect(false);
    this.router.navigate(['book-db']);
  }

  handleErrorResponse(errorResponse: any) {
    this.dataService.setFailedToConnect(true);
    this.dataService.setErrorCode(errorResponse.status);
    this.router.navigate(['error-page']);
  }
}

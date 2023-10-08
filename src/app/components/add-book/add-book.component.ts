import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
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
    private adminService: AdminService,
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.adminService.addBook(this.book).subscribe({
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

    this.book = {} as Book;
  }
}

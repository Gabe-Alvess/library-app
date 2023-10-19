import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    available: false,
  };

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private dataService: DataService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  formatDate() {
    const formattedDate = this.datePipe.transform(
      this.book.releaseDate,
      'dd/MM/yyyy'
    ) as string;

    this.book.releaseDate = formattedDate;
  }

  onSubmit() {
    this.formatDate();

    this.adminService.addBook(this.book).subscribe({
      next: (response: Book) => {
        this.newBook = response;
        this.dataService.setFailedToConnect(false);
      },
      error: (responseError) => {
        if (responseError.status === 422) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Book Already Added!',
          });
        } else {
          console.error('Get error: ', responseError);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(responseError.status);
          this.router.navigate(['error-page']);
        }
      },
    });

    this.book = {} as Book;
  }
}

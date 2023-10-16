import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
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
    private dataService: DataService,
    private router: Router
  ) {}

  onSubmit() {
    this.dataService.getBookId().subscribe((id) => {
      this.adminService.updateBook(id, this.book).subscribe({
        next: () => {
          this.dataService.setFailedToConnect(false);
          this.dataService.setUpdateBook(true);
          this.router.navigate(['book-db']);
        },
        error: (errorResponse) => {
          console.error('Update error: ', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setUpdateBook(false);
          this.dataService.setErrorCode(errorResponse.status);
          this.dataService.setErrorName(errorResponse.error.error);
          this.router.navigate(['error-page']);
        },
      });
    });

    this.book = {} as Book;
  }
}

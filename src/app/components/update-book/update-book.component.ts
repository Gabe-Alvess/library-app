import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
  providers: [MessageService],
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

  success = false;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private dataService: DataService,
    private router: Router
  ) {}

  submit() {
    this.dataService.getBookId().subscribe((id) => {
      this.adminService.updateBook(id, this.book).subscribe({
        next: () => {
          this.success = true;
          this.showMessage();
          this.dataService.setFailedToConnect(false);
        },
        error: (errorResponse) => {
          console.error('Update error: ', errorResponse);
          this.dataService.setFailedToConnect(true);
          this.dataService.setErrorCode(errorResponse.status);
          this.router.navigate(['error-page']);
        },
      });
    });

    this.book = {} as Book;
  }

  showMessage() {
    if (this.success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book successfully updated!',
      });

      this.success = false;

      setTimeout(() => {
        this.router.navigate(['book-db']);
      }, 3500);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { AdminService } from 'src/app/service/admin.service';
import { DataService } from 'src/app/service/data.service';
import { BookDbComponent } from '../book-db/book-db.component';

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

  success = false;
  updated = false;

  constructor(
    private adminService: AdminService,
    private dataService: DataService,
    private router: Router,
    private bookDb: BookDbComponent
  ) {}

  ngOnInit(): void {}

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

    this.book = {
      id: 0,
      imgURL: '',
      title: '',
      author: '',
      description: '',
      genres: '',
      releaseDate: '',
      available: false,
    };
  }

  showMessage() {
    if (this.success) {
      this.bookDb.updated = true;
      this.bookDb.showMessage();
    }
    this.success = false;
  }
}

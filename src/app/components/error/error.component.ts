import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  notFound: boolean = false;
  failedToConnect: boolean = false;
  errorCode: number = -1;
  errorName: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getNotFound().subscribe((data) => {
      this.notFound = data;
    });

    this.dataService.getFailedToConnect().subscribe((data) => {
      this.failedToConnect = data;
    });

    this.dataService.getErrorName().subscribe((name) => {
      this.errorName = name;
    });

    this.dataService.getErrorCode().subscribe((code) => {
      this.errorCode = code;
    });
  }
}

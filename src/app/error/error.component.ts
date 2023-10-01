import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

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
    this.dataService.notFound$.subscribe((data) => {
      this.notFound = data;
    });

    this.dataService.failedToConnect$.subscribe((data) => {
      this.failedToConnect = data;
    });

    this.dataService.errorName$.subscribe((name) => {
      this.errorName = name;
    });

    this.dataService.errorCode$.subscribe((code) => {
      this.errorCode = code;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  failedToConnect: boolean = false;
  errorCode: number = -1;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getFailedToConnect().subscribe((data) => {
      this.failedToConnect = data;
    });

    this.dataService.getErrorCode().subscribe((code) => {
      this.errorCode = code;
    });
  }
}

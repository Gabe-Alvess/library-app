import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  notFound: boolean = false;
  failed: boolean = false;
  errorCode: string = '';
  errorName: string = '';
}

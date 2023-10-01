import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchInput = new BehaviorSubject<string>('');
  private failedToConnect = new BehaviorSubject<boolean>(false);
  private notFound = new BehaviorSubject<boolean>(false);
  private errorName = new BehaviorSubject<string>('');
  private errorCode = new BehaviorSubject<number>(0);
  private bookId = new BehaviorSubject<number>(0);

  searchInput$ = this.searchInput.asObservable();
  notFound$ = this.notFound.asObservable();
  failedToConnect$ = this.failedToConnect.asObservable();
  errorName$ = this.errorName.asObservable();
  errorCode$ = this.errorCode.asObservable();
  bookId$ = this.bookId.asObservable();

  setSearchInput(input: string) {
    this.searchInput.next(input);
  }

  setFailedToConnect(failed: boolean) {
    this.failedToConnect.next(failed);
  }

  setErrorName(name: string) {
    this.errorName.next(name);
  }

  setErrorCode(code: number) {
    this.errorCode.next(code);
  }

  setNotFound(notFound: boolean) {
    this.notFound.next(notFound);
  }

  setBookId(id: number) {
    this.bookId.next(id);
  }
}

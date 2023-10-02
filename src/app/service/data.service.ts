import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchInput = new BehaviorSubject<string>('');
  private failedToConnect = new BehaviorSubject<boolean>(false);
  private notFound = new BehaviorSubject<boolean>(false);
  private errorName = new BehaviorSubject<string>('');
  private errorCode = new BehaviorSubject<number>(0);
  private book = new Subject<Book>();

  searchInput$ = this.searchInput.asObservable();
  notFound$ = this.notFound.asObservable();
  failedToConnect$ = this.failedToConnect.asObservable();
  errorName$ = this.errorName.asObservable();
  errorCode$ = this.errorCode.asObservable();
  book$ = this.book.asObservable();

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

  setBook(book: Book) {
    this.book.next(book);
  }
}

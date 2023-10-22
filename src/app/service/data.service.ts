import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchInput = new BehaviorSubject<string>('');
  private failedToConnect = new BehaviorSubject<boolean>(false);
  private notAllowed = new BehaviorSubject<boolean>(false);
  private errorCode = new BehaviorSubject<number>(0);
  private book = new BehaviorSubject<Book | undefined>(undefined);
  private updateSucceeded = new BehaviorSubject<boolean>(false);
  private bookId = new BehaviorSubject<number>(0);

  setUpdateSucceeded(succeeded: boolean) {
    this.updateSucceeded.next(succeeded);
  }

  isUpdateSucceeded() {
    return this.updateSucceeded.asObservable();
  }

  setSearchInput(input: string) {
    this.searchInput.next(input);
  }

  getSearchInput() {
    return this.searchInput.asObservable();
  }

  setFailedToConnect(failed: boolean) {
    this.failedToConnect.next(failed);
  }

  getFailedToConnect() {
    return this.failedToConnect.asObservable();
  }

  setNotAllowed(isAllowed: boolean) {
    this.notAllowed.next(isAllowed);
  }

  getNotAllowed() {
    return this.notAllowed.asObservable();
  }

  setErrorCode(code: number) {
    this.errorCode.next(code);
  }

  getErrorCode() {
    return this.errorCode.asObservable();
  }

  setBook(book: Book) {
    this.book.next(book);
  }

  getBook() {
    return this.book.asObservable();
  }

  setBookId(id: number) {
    this.bookId.next(id);
  }

  getBookId() {
    return this.bookId.asObservable();
  }
}

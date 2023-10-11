import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private book = new BehaviorSubject<Book | undefined>(undefined);
  private bookId = new BehaviorSubject<number>(0);
  private updateBook = new BehaviorSubject<boolean>(false);

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

  setErrorName(name: string) {
    this.errorName.next(name);
  }

  getErrorName() {
    return this.errorName.asObservable();
  }

  setErrorCode(code: number) {
    this.errorCode.next(code);
  }

  getErrorCode() {
    return this.errorCode.asObservable();
  }

  setNotFound(notFound: boolean) {
    this.notFound.next(notFound);
  }

  getNotFound() {
    return this.notFound.asObservable();
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

  setUpdateBook(boolean: boolean) {
    this.updateBook.next(boolean);
  }

  getUpdateBook() {
    return this.updateBook.asObservable();
  }
}

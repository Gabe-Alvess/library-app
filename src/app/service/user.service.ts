import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowedBook } from '../interfaces/BorrowedBook';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = {};
  private apiUrl = `http://localhost:8080/user`;

  constructor(private http: HttpClient) {}

  private initializeHeaders() {
    const token = sessionStorage.getItem('Token');

    if (token) {
      this.headers = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
    }
  }

  getUserName(email: string) {
    this.initializeHeaders();

    return this.http.get(`${this.apiUrl}/get?email=${email}`, this.headers);
  }

  getBorrowedBooks(email: string) {
    this.initializeHeaders();

    return this.http.get<BorrowedBook[]>(
      `${this.apiUrl}/borrowed/getAll?email=${email}`,
      this.headers
    );
  }

  borrowBook(email: string, bookId: number) {
    this.initializeHeaders();

    return this.http.post(
      `${this.apiUrl}/borrow?email=${email}&bookId=${bookId}`,
      null,
      this.headers
    );
  }

  renewDueDate(email: string, bookId: number) {
    this.initializeHeaders();

    return this.http.post(
      `${this.apiUrl}/renew?email=${email}&bbId=${bookId}`,
      null,
      this.headers
    );
  }

  returnBook(email: string, bookId: number) {
    this.initializeHeaders();

    return this.http.post(
      `${this.apiUrl}/return?email=${email}&bbId=${bookId}`,
      null,
      this.headers
    );
  }
}

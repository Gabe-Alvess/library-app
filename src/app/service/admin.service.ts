import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private headers = {};
  private apiUrl = `http://localhost:8080/book`;
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

  addBook(book: Book): Observable<Book> {
    this.initializeHeaders();
    return this.http.post<Book>(`${this.apiUrl}/adm/add`, book, this.headers);
  }

  addBooks(books: Book[]): Observable<Book> {
    this.initializeHeaders();
    return this.http.post<Book>(
      `${this.apiUrl}/adm/multiAdd`,
      books,
      this.headers
    );
  }

  updateBook(id: number, book: Book) {
    this.initializeHeaders();
    return this.http.patch(
      `${this.apiUrl}/adm/update?id=${id}`,
      book,
      this.headers
    );
  }

  deleteBook(id: number) {
    this.initializeHeaders();
    return this.http.delete(`${this.apiUrl}/adm/delete?id=${id}`, this.headers);
  }
}

import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private options = {};
  private headers = new HttpHeaders();
  private token = localStorage.getItem('token');
  private apiUrl = `http://localhost:8080/book`;
  constructor(private http: HttpClient) {}

  private initializeHeaders() {
    if (this.token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      this.options = {
        headers: this.headers,
      };
    }
  }

  addBook(book: Book): Observable<Book> {
    this.initializeHeaders();
    return this.http.post<Book>(`${this.apiUrl}/adm/add`, book, this.options);
  }

  addBooks(books: Book[]): Observable<Book> {
    this.initializeHeaders();
    return this.http.post<Book>(
      `${this.apiUrl}/adm/multiAdd`,
      books,
      this.options
    );
  }

  updateBook(id: number, book: Book): Observable<Book> {
    this.initializeHeaders();
    return this.http.patch<Book>(
      `${this.apiUrl}/adm/update?id=${id}`,
      book,
      this.options
    );
  }

  deleteBook(id: number) {
    this.initializeHeaders();
    return this.http.delete(`${this.apiUrl}/adm/delete?id=${id}`, this.options);
  }
}

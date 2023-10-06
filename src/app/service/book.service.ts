import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:8080/books`;
  constructor(private http: HttpClient) {}

  searchForBooks(searchInput: string) {
    return this.http.get<Book[]>(
      `${this.apiUrl}/search?userSearch=${searchInput}`
    );
  }

  findBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}/book?id=${id}`);
  }

  findBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }

  findPopularBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/popular`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  updateBook(id: number, book: Book) {
    return this.http.patch<Book>(`${this.apiUrl}/update?id=${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/delete?id=${id}`);
  }
}

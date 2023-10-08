import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:8080/book`;
  constructor(private http: HttpClient) {}

  searchForBooks(searchInput: string) {
    return this.http.get<Book[]>(
      `${this.apiUrl}/search?userSearch=${searchInput}`
    );
  }

  findPopularBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/popular`);
  }

  findBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}/get?id=${id}`);
  }

  findBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/getAll`);
  }
}

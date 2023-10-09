import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private options = {};
  private headers = new HttpHeaders();
  private token = localStorage.getItem('token');
  private apiUrl = `http://localhost:8080/user`;

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

  getUserName(email: string) {
    this.initializeHeaders();

    return this.http.get<any>(
      `${this.apiUrl}/get?email=${email}`,
      this.options
    );
  }
}

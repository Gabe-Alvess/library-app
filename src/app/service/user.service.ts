import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<any>(
      `${this.apiUrl}/get?email=${email}`,
      this.headers
    );
  }
}

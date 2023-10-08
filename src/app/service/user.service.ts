import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `http://localhost:8080/user`;
  constructor(private http: HttpClient) {}

  getUserName(email: string) {
    let headers = new HttpHeaders({});

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    return this.http.get<any>(`${this.apiUrl}/get?email=${email}`, { headers });
  }
}

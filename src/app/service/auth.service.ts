import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080`;
  constructor(private http: HttpClient) {}

  signup(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(userInfo: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, userInfo);
  }
}

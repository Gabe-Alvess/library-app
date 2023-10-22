import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080`;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  private getToken(): boolean {
    if (localStorage.getItem('Token')) {
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      this.router.navigate(['login-page']);
      return false;
    }
  }

  getLoginStatus(): boolean {
    if (this.getToken()) {
      return true;
    }

    return false;
  }

  isUser(): boolean {
    const role = localStorage.getItem('Role');

    if (role && role === 'USER') {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('Role');

    if (role && role === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  isAllowed(): boolean {
    const role = localStorage.getItem('Role');

    if (role && role === 'ADMIN') {
      this.dataService.setNotAllowed(false);
      return true;
    } else {
      this.dataService.setNotAllowed(true);
      this.router.navigate(['error-page']);
      return false;
    }
  }

  signup(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(userInfo: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, userInfo);
  }
}

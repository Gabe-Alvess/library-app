import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn();
    this.isAdmin();
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('Token');

    if (token) {
      return true;
    } else {
      this.router.navigate(['login-page']);
      return false;
    }
  }

  isAdmin(): boolean {
    const role = sessionStorage.getItem('Role');

    if (role && role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['error-page']);
      return false;
    }
  }
}

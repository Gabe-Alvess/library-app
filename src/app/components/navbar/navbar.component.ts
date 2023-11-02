import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  isUser: boolean = false;
  isAdmin: boolean = false;
  isLoggedIn = false;
  alreadyLoggedIn = false;

  firstName: string = '';
  lastName: string = '';
  profilePhotoUrl?: SafeUrl;
  showMessage = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.isUser = this.authService.isUser();
    this.isAdmin = this.authService.isAdmin();
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    this.isLoggedIn = this.authService.getLoginStatus();

    if (this.isLoggedIn && !this.alreadyLoggedIn) {
      this.findUserInfo();
    }

    this.alreadyLoggedIn = this.isLoggedIn;
  }

  findUserInfo() {
    const email = localStorage.getItem('Email');

    if (email) {
      this.userService.getUserInfo(email).subscribe({
        next: (response: any) => {
          this.handleSuccessfulResponse(response);
        },
        error: (errorResponse) => {
          this.handleErrorResponse(errorResponse);
        },
      });
    } else {
      console.log('Email Not Found!!!');
    }
  }

  handleSuccessfulResponse(response: any) {
    this.firstName = response.firstName;
    this.lastName = response.lastName;

    const blob = this.stringToBlobConverter(response.profilePhoto);
    const url = URL.createObjectURL(blob);
    this.profilePhotoUrl = this.sanitizer.bypassSecurityTrustUrl(url);

    localStorage.setItem('firstName', response.firstName);
    localStorage.setItem('lastName', response.lastName);
    localStorage.setItem('profilePhoto', response.profilePhoto);

    this.dataService.setFailedToConnect(false);
  }

  handleErrorResponse(errorResponse: any) {
    console.log('Navbar error', errorResponse);
    this.dataService.setFailedToConnect(true);
    this.dataService.setErrorCode(errorResponse.status);
    this.router.navigate(['error-page']);
  }

  stringToBlobConverter(base64String: string): Blob {
    // Decode the base64 string to binary data
    const binaryData = atob(base64String);

    // Create a Uint8Array to hold the binary data
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array

    return new Blob([uint8Array], { type: 'image/png' });
  }

  scrollToCatalog() {
    const currentUrl = this.location.path();

    if (currentUrl.length !== 0) {
      this.router.navigate(['/']);

      setTimeout(() => {
        const catalog = document.querySelector('#catalog');

        if (catalog) {
          catalog.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const catalog = document.querySelector('#catalog');

      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToHome() {
    const home = document.querySelector('#home');

    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout(): void {
    localStorage.clear();
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  // @ViewChild('fileInput') fileInput: ElementRef;

  profilePhoto?: SafeUrl;
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  editEmail: boolean = true;
  saveEmail: boolean = false;

  editFirstName: boolean = true;
  saveFirstName: boolean = false;

  editLastName: boolean = true;
  saveLastName: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserProfileData();
    }
  }

  getUserProfileData() {
    const email = localStorage.getItem('Email');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const profilePhoto = localStorage.getItem('profilePhoto');

    if (email && firstName && lastName && profilePhoto) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.hasProfilePhoto(profilePhoto);
    } else {
      console.log('Profile Data Not Found!');
    }
  }

  hasProfilePhoto(profilePhoto: string) {
    if (profilePhoto.length > 0) {
      const blob = this.stringToBlobConverter(profilePhoto);
      const url = URL.createObjectURL(blob);
      this.profilePhoto = this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      return;
    }
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

  openFileInput(input: ElementRef) {
    input.nativeElement.click(); // Open the file input dialog
  }

  onFileSelected(input: ElementRef) {
    const file = input.nativeElement.files[0]; // Get the selected file

    // Handle the selected file here, e.g., upload it to a server or process it
  }

  updateEmail() {
    this.editEmail = false;
    this.saveEmail = true;
  }

  updateFirstName() {
    this.editFirstName = false;
    this.saveFirstName = true;
  }

  updateLastName() {
    this.editLastName = false;
    this.saveLastName = true;
  }
}

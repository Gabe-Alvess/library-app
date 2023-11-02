import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookDbComponent } from './components/book-db/book-db.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';
import { AvatarModule } from 'primeng/avatar';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent,
    SignupPageComponent,
    FooterComponent,
    ErrorPageComponent,
    SearchPageComponent,
    SearchBarComponent,
    CarouselComponent,
    BookPageComponent,
    AddBookComponent,
    BookDbComponent,
    UserBooksComponent,
    UpdateBookComponent,
    BookCatalogComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    PasswordModule,
    PaginatorModule,
    AvatarModule,
    CarouselModule.forRoot(),
  ],
  providers: [MessageService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

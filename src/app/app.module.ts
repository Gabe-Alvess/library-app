import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ErrorComponent } from './components/error/error.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookDbComponent } from './components/book-db/book-db.component';
import { UserBooksComponent } from './components/user-books/user-books.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent,
    SignupPageComponent,
    FooterComponent,
    ErrorComponent,
    SearchPageComponent,
    SearchBarComponent,
    CarouselComponent,
    BookPageComponent,
    AddBookComponent,
    BookDbComponent,
    UserBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDbComponent } from './components/book-db/book-db.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  {
    path: 'signup-page',
    component: SignupPageComponent,
  },
  {
    path: 'search-page',
    component: SearchPageComponent,
  },
  {
    path: 'book-page',
    component: BookPageComponent,
  },
  {
    path: 'add-book',
    component: AddBookComponent,
  },
  {
    path: 'book-db',
    component: BookDbComponent,
  },
  {
    path: 'update-book',
    component: UpdateBookComponent,
  },
  {
    path: 'user-books',
    component: UserBooksComponent,
  },
  {
    path: 'profile-page',
    component: ProfilePageComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

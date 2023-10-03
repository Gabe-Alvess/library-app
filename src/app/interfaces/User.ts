import { Book } from './Book';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  borrowedBooks: Array<Book>;
}

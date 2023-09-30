import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchInputSubject = new BehaviorSubject<string>('');
  searchInput$ = this.searchInputSubject.asObservable();

  setSearchInput(input: string) {
    this.searchInputSubject.next(input);
  }

  getSearchInput(): string {
    return this.searchInputSubject.value;
  }
}

import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchInput: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  updateSearch() {
    this.dataService.setSearchInput(this.searchInput);
    this.router.navigate(['books'])
    this.searchInput = '';
  }
}

import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchInput: string = '';

  constructor(private dataService: DataService) {}

  updateSearch() {
    this.dataService.setSearchInput(this.searchInput);
  }
}

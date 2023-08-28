import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultComponent } from '../search-result/search-result.component';
import { LocationService } from '../../services';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [CommonModule, SearchResultComponent],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  private debounceTimer?: NodeJS.Timeout;

  private locationService = inject(LocationService);

  onQueryChange(query: string = '') {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.locationService.getPlacesByQuery(query);
    }, 500);
  }
}

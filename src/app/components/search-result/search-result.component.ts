import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService, MapService } from 'src/app/services';
import { Feature } from 'src/app/interfaces/places';
import { Marker } from 'mapbox-gl';

@Component({
  selector: 'search-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  private locationService = inject(LocationService);
  private mapService = inject(MapService);

  public isSelectedId: string = '';

  get isloadinPlaces(): boolean {
    return this.locationService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.locationService.places;
  }

  flyTo(place: Feature): void {
    this.isSelectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this.locationService.userLocation) throw Error('User location is not ready');

    const start = this.locationService.userLocation;
    const end = place.center as [number, number];

    this.locationService.deletePlaces();

    this.mapService.getRouteBetweenPoints(start, end);
  }
}

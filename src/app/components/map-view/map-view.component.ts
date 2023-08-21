import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../loading/loading.component';
import { MapsComponent } from '../maps/maps.component';
import { LocationService } from 'src/app/services';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MapsComponent],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent {
  private locationService = inject(LocationService);

  get isUserLocationReady() {
    return this.locationService.isUserLocationReady;
  }
}

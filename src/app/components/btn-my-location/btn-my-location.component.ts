import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService, MapService } from 'src/app/services';

@Component({
  selector: 'btn-my-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css'],
})
export class BtnMyLocationComponent {
  private locationService = inject(LocationService);
  private mapService = inject(MapService);

  public icon: string = '<i class="bi bi-geo-alt"></i>';

  gotoMyLocation(): void {
    if (!this.locationService.isUserLocationReady) throw new Error('Location not found');

    if (!this.mapService.isMapReady) throw new Error('Map is not ready');

    this.mapService.flyTo(this.locationService.userLocation!);
  }
}

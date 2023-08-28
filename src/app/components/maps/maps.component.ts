import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';

import { LocationService, MapService } from '../../services';

import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  private map!: Map;

  private locationService = inject(LocationService);
  private mapService = inject(MapService);

  get isUserLocationReady() {
    return this.locationService.isUserLocationReady;
  }

  ngAfterViewInit(): void {
    if (!this.locationService.userLocation) throw new Error('Location not found');

    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.locationService.userLocation,
      zoom: 14,
    });

    const popup = new Popup({ offset: 25 }).setHTML('<h6>Aquí estas</h6><span>Estas en este lugar del mundo. </span>');

    new Marker({ color: 'red' }).setLngLat(this.locationService.userLocation).setPopup(popup).addTo(this.map);

    this.mapService.setMap(this.map);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../loading/loading.component';
import { MapsComponent } from '../maps/maps.component';
import { LocationService } from 'src/app/services';
import { AngularLogoComponent } from '../angular-logo/angular-logo.component';
import { BtnMyLocationComponent } from '../btn-my-location/btn-my-location.component';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    MapsComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchBoxComponent,
  ],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent {
  private locationService = inject(LocationService);

  get isUserLocationReady() {
    return this.locationService.isUserLocationReady;
  }
}

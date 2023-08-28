import { Injectable, inject } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places';

import { PlacesApiClient } from '../api';

import { MapService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  private placesApiClient = inject(PlacesApiClient);
  private mapService = inject(MapService);

  constructor() {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number] | undefined> {
    if (this.isUserLocationReady) {
      return this.userLocation;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  getPlacesByQuery(query: string) {
    if (query.length == 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if (!this.userLocation) throw new Error('User location is not ready');
    this.isLoadingPlaces = true;

    this.placesApiClient
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation!.join(','),
        },
      })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}

import { Injectable, inject } from '@angular/core';

import { Map, LngLatLike, Marker, Popup, LngLatBoundsLike, LngLatBounds, AnySourceData } from 'mapbox-gl';

import { Feature } from '../interfaces/places';
import { DirectionsResponse, Route } from '../interfaces/directions';

import { DirectionsApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady(): boolean {
    return !!this.map;
  }

  private directionsApi = inject(DirectionsApiClient);

  setMap(map: Map): void {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw new Error('Map is not ready');
    }
    this.map?.flyTo({ zoom: 14, center: coords });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Map is not ready');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `);

      const newMarker = new Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    const bounceMarker = new LngLatBounds();
    newMarkers.forEach(marker => bounceMarker.extend(marker.getLngLat()));
    bounceMarker.extend(userLocation);

    this.map.fitBounds(bounceMarker, { padding: 100, maxZoom: 15 });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawRoute(resp.routes[0]));
  }

  private drawRoute(route: Route) {
    if (!this.map) throw Error('Map is not ready');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    this.map.fitBounds(bounds, { padding: 100, maxZoom: 15 });

    // LineStream
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      },
    };

    if (this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    this.map.addSource('route', sourceData);

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ffc617',
        'line-width': 4,
      },
    });
  }
}

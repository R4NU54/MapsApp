import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoicmFudXNhIiwiYSI6ImNsam5iZW1pdDAzY3EzY3F1Z2Job3hwNncifQ.fmI5RXFufAgyZ2vxvalrOg';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

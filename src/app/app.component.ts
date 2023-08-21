import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './components/map-view/map-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MapViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MapsApp';
}

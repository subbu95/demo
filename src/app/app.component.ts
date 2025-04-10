import { Component } from '@angular/core';
import { ScrollableGridComponent } from './scrollable-grid/scrollable-grid.component';

@Component({
  selector: 'app-root',
  imports: [ScrollableGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
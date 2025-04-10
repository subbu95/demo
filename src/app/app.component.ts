import { Component } from '@angular/core';
import { StickyTableComponent } from './sticky-table/sticky-table.component';

@Component({
  selector: 'app-root',
  imports: [StickyTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
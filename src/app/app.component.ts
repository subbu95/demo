import { Component } from '@angular/core';
import { StickyTable002Component } from './sticky-table002/sticky-table002.component';

@Component({
  selector: 'app-root',
  imports: [StickyTable002Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
}
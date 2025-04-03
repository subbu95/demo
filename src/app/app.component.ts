import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';

}

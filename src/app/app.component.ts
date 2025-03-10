import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  imports: [MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo'; 
  

}

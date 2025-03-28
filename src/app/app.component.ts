import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dropdown003Component } from './dropdown003/dropdown003.component';

interface MenuItem {
  label: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  imports: [ CommonModule, Dropdown003Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo'; 
  

}

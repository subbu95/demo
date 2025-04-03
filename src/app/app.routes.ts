import { Routes } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';
import { Dropdown001Component } from './dropdown001/dropdown001.component';
import { Dropdown002Component } from './dropdown002/dropdown002.component';
import { Dropdown003Component } from './dropdown003/dropdown003.component';
import { Dropdown004Component } from './dropdown004/dropdown004.component';
import { Dropdown005Component } from './dropdown005/dropdown005.component';

export const routes: Routes = [
  {
    path: '',
    component: DropdownComponent
  },
  {
    path: 'about',
    component: Dropdown001Component
  },
  {
    path: 'contact',
    component: Dropdown002Component
  },
  {
    path: 'profile',
    component: Dropdown003Component
  },
  {
    path: 'test',
    component: Dropdown004Component
  },
  {
    path: 'drop',
    component: Dropdown005Component
  },
  {
    path: '**',
    redirectTo: ''
  }
];

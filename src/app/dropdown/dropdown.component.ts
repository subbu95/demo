import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() items: { label: string, children?: { label: string, children?: any[] }[] }[] = [];
  @Input() placeholder: string = 'Select';
  @Output() itemSelected = new EventEmitter<string>();
  
  isOpen = false;
  selectedLabel: string | null = null;
  activeMenu: any[] | null = null;
  menuStack: any[][] = [];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.activeMenu = this.items;
    }
  }

  navigateToSubmenu(submenu: any[]) {
    this.menuStack.push(this.activeMenu!);
    this.activeMenu = submenu;
  }

  navigateBack() {
    this.activeMenu = this.menuStack.pop() || this.items;
  }

  selectItem(item: string) {
    this.selectedLabel = item;
    this.itemSelected.emit(item);
    this.isOpen = false;
    this.menuStack = [];
    this.activeMenu = this.items;
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown004',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline" class="dropdown-container">
      <input matInput [value]="selectedOption" readonly (keydown)="onKeyPress($event)" placeholder="Search...">
      <mat-select panelClass="custom-dropdown" [(value)]="selectedOption" (selectionChange)="updateSelection()">
        <mat-option *ngFor="let option of filteredOptions; let i = index" [value]="option" 
                    [matTooltip]="option.length > 15 ? option : ''" 
                    [ngClass]="{'highlight': i === highlightedIndex}"
                    (mouseenter)="highlightedIndex = i">
          {{ option }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `.dropdown-container { width: 450px; } /* Increased width by 50% */
     .custom-dropdown { max-height: 75vh !important; min-width: 450px !important; }
     .highlight { background-color: lightblue !important; }`
  ]
})
export class Dropdown004Component {
  options: string[] = ['Argentina', 'Australia', 'Brazil', 'Canada', 'Denmark', 'France', 'Germany', 'India', 'Indonesia', 'Japan', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'United States'];
  filteredOptions: string[] = [...this.options].sort();
  selectedOption: string = '';
  highlightedIndex: number = -1;
  searchBuffer: string = '';
  searchTimeout: any;
  matchIndex: number = 0;

  onKeyPress(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === 'arrowdown') {
      this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredOptions.length;
      this.selectedOption = this.filteredOptions[this.highlightedIndex];
    } else if (key === 'arrowup') {
      this.highlightedIndex = (this.highlightedIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
      this.selectedOption = this.filteredOptions[this.highlightedIndex];
    } else if (/^[a-zA-Z]$/.test(key)) {
      clearTimeout(this.searchTimeout);
      this.searchBuffer += key;
      
      const matches = this.filteredOptions.filter(opt => opt.toLowerCase().startsWith(this.searchBuffer));
      if (matches.length > 0) {
        this.matchIndex = (this.matchIndex + 1) % matches.length;
        this.selectedOption = matches[this.matchIndex];
        this.highlightedIndex = this.filteredOptions.indexOf(this.selectedOption);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.searchBuffer = '';
        this.matchIndex = 0;
      }, 100); // 5s buffer for fast typing
    }
  }

  updateSelection() {
    this.highlightedIndex = this.filteredOptions.indexOf(this.selectedOption);
  }
}

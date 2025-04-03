import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field appearance="outline" class="dropdown-container">
      <mat-label>Work Team</mat-label>
      <mat-select #matSelect [formControl]="searchControl" (keydown)="onKeyPress($event)" (selectionChange)="onOptionClick1($event.value)">
        <mat-option *ngFor="let option of options; let i = index" [value]="option"
                    [class.highlighted]="i === highlightedIndex" (click)="onOptionClick(option, i)">
          {{ option }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
    .dropdown-container {
      width: 200px;
    }
    mat-option {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .highlighted {
      background-color: lightblue !important;
    }
    mat-select-panel {
      max-height: 75vh;
    }
    `
  ]
})
export class CustomDropdownComponent implements OnInit {
  @ViewChild(MatSelect) matSelect!: MatSelect;
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  options: string[] = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];
  searchControl = new FormControl('No Work Team');
  highlightedIndex: number = -1;
  searchText: string = '';
  searchTimeout: any;

  ngOnInit(): void {
    this.options.sort((a, b) => a.localeCompare(b)); // Sort options alphabetically
  }

  onKeyPress(event: KeyboardEvent): void {    
    const key = event.key.toLowerCase();
    if (key.length === 1 && /[a-z]/.test(key)) {
      clearTimeout(this.searchTimeout);
      this.searchText += key;
      this.highlightFirstMatch(this.searchText);
      this.searchTimeout = setTimeout(() => this.searchText = '', 500); // Reset search text if no typing after 500ms
    } else if (key === 'arrowdown') {
      this.navigateOptions(1);
    } else if (key === 'arrowup') {
      this.navigateOptions(-1);
    }
  }

  highlightFirstMatch(search: string): void {   
    const matches = this.options.filter(opt => opt.toLowerCase().includes(search));
    if (matches.length) {
      this.highlightedIndex = this.options.indexOf(matches[0]);
      this.searchControl.setValue(matches[0]);
    }
  }

  navigateOptions(step: number): void {
    if (this.highlightedIndex === -1) return; // Ensure navigation starts from a highlighted value    
    this.highlightedIndex = (this.highlightedIndex + step + this.options.length) % this.options.length;
    this.searchControl.setValue(this.options[this.highlightedIndex]);
  }

  onOptionClick(option: string, index: number): void {
    this.highlightedIndex = index;
    this.searchControl.setValue(option);
  }

  onOptionClick1(option: any): void {    
    const index = this.options.indexOf(option);
  if (index !== -1) {
    this.highlightedIndex = index;
    this.searchControl.setValue(option);
  }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.matSelect.panelOpen) {
      this.searchControl.setValue('No Work Team'); // Reset to default text on close
      this.highlightedIndex = -1;
      this.searchText = '';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown002',
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
    `.dropdown-container { width: 300px; } /* Increased width by 50% */
     .custom-dropdown { max-height: 75vh !important; min-width: 300px !important; }
     .highlight { background-color: lightblue !important; }`
  ]
})
export class Dropdown002Component {
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
  filteredOptions: string[] = [...this.options].sort();
  selectedOption: string = '';
  highlightedIndex: number = -1;
  lastSearchChars: string = '';
  searchTimeout: any;
  lastSearchLetter: string = '';
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
      
      if (this.lastSearchLetter === key) {
        this.matchIndex++;
      } else {
        this.lastSearchLetter = key;
        this.matchIndex = 0;
      }
      
      const matches = this.filteredOptions.filter(opt => opt.toLowerCase().startsWith(key));
      if (matches.length > 0) {
        this.matchIndex %= matches.length;
        this.selectedOption = matches[this.matchIndex];
        this.highlightedIndex = this.filteredOptions.indexOf(this.selectedOption);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.lastSearchLetter = '';
        this.matchIndex = 0;
      }, 5000); // 5s buffer for fast typing
    }
  }

  updateSelection() {
    this.highlightedIndex = this.filteredOptions.indexOf(this.selectedOption);
  }
}

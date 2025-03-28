import { Component, ElementRef, HostListener, ViewChild, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-dropdown001',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatIconModule],
  template: `
    <mat-form-field appearance="outline" class="full-width" (click)="toggleDropdown()">
      <input matInput [value]="selectedValue()" placeholder="Select an option" readonly />
      <mat-icon matSuffix>arrow_drop_down</mat-icon>
    </mat-form-field>

    <div *ngIf="isOpen()" class="dropdown-container" #dropdown>
      <div *ngFor="let option of sortedOptions; let i = index"
           [class.highlight]="i === highlightedIndex"
           [matTooltip]="option.length > 15 ? option : null"
           (mouseenter)="highlightOption(i)"
           (click)="selectOption(option)">
        {{ option }}
      </div>
    </div>
  `,
  styles: [`
    .full-width { width: 200px; cursor: pointer; }
    .dropdown-container {
      position: absolute;
      width: 200px;
      max-height: 75vh;
      overflow-y: auto;
      border: 1px solid #ccc;
      background: white;
      z-index: 1000;
    }
    .dropdown-container div {
      padding: 10px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dropdown-container div.highlight {
      background-color: lightblue;
    }
  `]
})
export class Dropdown001Component {
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

  selectedValue = signal('');
  isOpen = signal(false);
  highlightedIndex = -1;
  searchBuffer = '';
  searchIndexes: number[] = [];
  searchPosition = 0;
  lastSearchKey = '';
  searchTimeout: any;

  get sortedOptions(): string[] {
    return [...this.options].sort((a, b) => a.localeCompare(b));
  }

  @ViewChild('dropdown') dropdown!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }

    if (event.key.match(/^[a-zA-Z]$/)) {
      // Reset search buffer if new key is different from the last pressed key
      if (this.lastSearchKey !== event.key) {
        this.searchBuffer = event.key.toLowerCase();
        this.updateSearchIndexes();
        this.searchPosition = 0;
      } else {
        this.searchPosition = (this.searchPosition + 1) % this.searchIndexes.length;
      }

      this.lastSearchKey = event.key;
      this.highlightNextMatch();

      // Reset buffer after 5 seconds
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchBuffer = '';
        this.searchIndexes = [];
        this.searchPosition = 0;
        this.lastSearchKey = '';
      }, 10000); // <-- Updated buffer timeout to 5 seconds
    }

    if (event.key === 'Enter' && this.highlightedIndex !== -1) {
      this.selectOption(this.sortedOptions[this.highlightedIndex]);
    }
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  updateSearchIndexes() {
    this.searchIndexes = this.sortedOptions
      .map((opt, idx) => ({ index: idx, value: opt.toLowerCase() }))
      .filter(opt => opt.value.startsWith(this.searchBuffer))
      .map(opt => opt.index);
  }

  highlightNextMatch() {
    if (this.searchIndexes.length > 0) {
      this.highlightedIndex = this.searchIndexes[this.searchPosition];
      this.selectedValue.set(this.sortedOptions[this.highlightedIndex]);
      this.scrollToHighlighted();
    }
  }

  selectOption(option: string) {
    this.selectedValue.set(option);
    this.isOpen.set(false);
    this.searchBuffer = '';
    this.highlightedIndex = -1;
    this.searchIndexes = [];
    this.searchPosition = 0;
    this.lastSearchKey = '';
  }

  highlightOption(index: number) {
    this.highlightedIndex = index;
  }

  scrollToHighlighted() {
    setTimeout(() => {
      if (this.dropdown && this.dropdown.nativeElement) {
        const highlighted = this.dropdown.nativeElement.querySelector('.highlight');
        if (highlighted) {
          highlighted.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }
}

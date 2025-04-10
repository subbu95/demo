import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-scrollable-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './scrollable-grid.component.html',
  styleUrls: ['./scrollable-grid.component.css']
})
export class ScrollableGridComponent {

  function sendCountryCode(code) {
    // Assuming the Angular app is on the same domain or properly configured for CORS
    const angularAppWindow = window.parent || window.opener || window; 
    angularAppWindow.postMessage({ type: 'COUNTRY_CODE_CHANGE', payload: code }, '*');
  }
  displayedColumns = ['options', 'id', 'description', 'workteam', 'country', 'lastUpdatedBy', 'updatedDate'];
  dataSource = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    description: `DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription ${i + 1}`,
    workteam: `TeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeamTeam ${i % 5}`,
    country: `CountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountryCountry ${i % 10}`,
    lastUpdatedBy: `UserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUser ${i % 7}`,
    updatedDate: new Date(2024, i % 12, (i % 28) + 1).toDateString()
  }));
}

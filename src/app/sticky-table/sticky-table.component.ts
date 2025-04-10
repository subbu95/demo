import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-sticky-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  template: `
    <div class="table-wrapper">
      <div class="table-scroll">
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 sticky-table">

          <!-- Sticky Index Column -->
          <ng-container matColumnDef="index">
            <th mat-header-cell *matHeaderCellDef class="sticky-col sticky-header sticky-corner">#</th>
            <td mat-cell *matCellDef="let row; let i = index" class="sticky-col">{{ i + 1 }}</td>
          </ng-container>

          <!-- Dynamic Columns -->
          <ng-container *ngFor="let col of columns" [matColumnDef]="col.key">
            <th mat-header-cell *matHeaderCellDef class="sticky-header">{{ col.label }}</th>
            <td mat-cell *matCellDef="let row">{{ row[col.key] }}</td>
          </ng-container>

          <!-- Header and Row definitions -->
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    .table-scroll {
      overflow: auto;
      max-height: 75vh;
      border: 1px solid #ccc;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1200px;
    }

    th, td {
      padding: 8px 16px;
      border: 1px solid #ccc;
      white-space: nowrap;
      background: white;
    }

    .sticky-header {
      position: sticky;
      top: 0;
      background-color: #f1f1f1;
      z-index: 10;
    }

    .sticky-col {
      position: sticky;
      left: 0;
      background-color: #fafafa;
      z-index: 11;
    }

    .sticky-corner {
      z-index: 12 !important;
      background-color: #e0e0e0 !important;
    }

    .sticky-table th, .sticky-table td {
      background-clip: padding-box;
    }

    /* Thin scrollbar */
    .table-scroll::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }

    .table-scroll::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }

    .table-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
  `]
})
export class StickyTableComponent {
  dataSource = new MatTableDataSource<any>([]);
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'description', label: 'Description' },
    { key: 'workteam', label: 'Workteam' },
    { key: 'country', label: 'Country' },
    { key: 'language', label: 'Language' },
    { key: 'currency', label: 'Currency' },
    { key: 'population', label: 'Population' },
    { key: 'religion', label: 'Religion' },
    { key: 'perCapita', label: 'Per Capita Income' },
    { key: 'economyGDP', label: 'Economy GDP' },
    { key: 'updatedBy', label: 'Last Updated By' },
    { key: 'updatedDate', label: 'Updated Date' }
  ];
  displayedColumns = ['index', ...this.columns.map(c => c.key)];

  ngOnInit() {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `ID-${i + 1}`,
      description: `DescriptionDescriptionDescriptionDescription ${i + 1}`,
      workteam: `TeamTeamTeamTeamTeam ${i % 4 + 1}`,
      country: ['USA', 'Germany', 'India', 'Canada'][i % 4],
      language: ['English', 'German', 'Hindi', 'French'][i % 4],
      currency: ['USD', 'EUR', 'INR', 'CAD'][i % 4],
      population: `${(10 + i) * 1000000}`,
      religion: ['Christianity', 'Hinduism', 'Islam', 'None'][i % 4],
      perCapita: `$${(30000 + i * 100).toLocaleString()}`,
      economyGDP: `$${(1.5 + i * 0.01).toFixed(2)}T`,
      updatedBy: `UserUserUserUserUserUserUser ${i % 10 + 1}`,
      updatedDate: new Date(Date.now() - i * 100000000).toLocaleDateString()
    }));
    this.dataSource.data = data;
  }
}

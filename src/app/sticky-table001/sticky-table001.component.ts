import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-sticky-table001',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  template: `
    <div class="table-wrapper">
      <div class="table-scroll">
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8 sticky-table">

          <!-- Non-sortable Sticky Index Column -->
          <ng-container matColumnDef="rowNumber">
            <th mat-header-cell *matHeaderCellDef class="sticky-col sticky-header sticky-corner">#</th>
            <td mat-cell *matCellDef="let row" class="sticky-col">{{ row.rowNumber }}</td>
          </ng-container>

          <!-- Dynamic Sortable Columns -->
          <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="sticky-header">
              {{ column.label }}
            </th>
            <td mat-cell *matCellDef="let row">{{ row[column.key] }}</td>
          </ng-container>

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
      min-width: 1600px;
    }

    th, td {
      padding: 8px 16px;
      border: 1px solid #ccc;
      white-space: nowrap;
      background: white;
      background-clip: padding-box;
    }

    .sticky-header {
      position: sticky;
      top: 0;
      background-color: #f9f9f9;
      z-index: 100;
    }

    .sticky-col {
      position: sticky;
      left: 0;
      background-color: #fafafa;
      z-index: 101;
    }

    .sticky-corner {
      z-index: 110 !important;
      background-color: #f1f1f1 !important;
    }

    .mat-header-cell {
      font-weight: bold;
      background-color: #f3f3f3;
    }

    .sticky-table th, .sticky-table td {
      background-clip: padding-box;
    }

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
export class StickyTable001Component implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

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
    { key: 'updatedDate', label: 'Updated Date' },
    { key: 'nationalSport', label: 'National Sport' },
    { key: 'nationalAnimal', label: 'National Animal' },
    { key: 'capital', label: 'Capital' },
    { key: 'continent', label: 'Continent' }
  ];

  displayedColumns = ['rowNumber', ...this.columns.map(c => c.key)];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    const data = Array.from({ length: 50 }, (_, i) => ({
      rowNumber: i + 1,
      id: `ID-${i + 1}`,
      description: `Description ${i + 1}`,
      workteam: `Team ${i % 4 + 1}`,
      country: ['USA', 'Germany', 'India', 'Canada'][i % 4],
      language: ['English', 'German', 'Hindi', 'French'][i % 4],
      currency: ['USD', 'EUR', 'INR', 'CAD'][i % 4],
      population: `${(10 + i) * 1000000}`,
      religion: ['Christianity', 'Hinduism', 'Islam', 'None'][i % 4],
      perCapita: `${30000 + i * 100}`,
      economyGDP: `${1.5 + i * 0.01}`,
      updatedBy: `User ${i % 10 + 1}`,
      updatedDate: new Date(Date.now() - i * 100000000).toLocaleDateString(),
      nationalSport: ['Baseball', 'Football', 'Cricket', 'Hockey'][i % 4],
      nationalAnimal: ['Bald Eagle', 'Black Eagle', 'Tiger', 'Beaver'][i % 4],
      capital: ['Washington D.C.', 'Berlin', 'New Delhi', 'Ottawa'][i % 4],
      continent: ['North America', 'Europe', 'Asia', 'North America'][i % 4]
    }));

    this.dataSource.data = data;

    this.dataSource.sortingDataAccessor = (item, property) =>
      property === 'rowNumber' ? null : item[property];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

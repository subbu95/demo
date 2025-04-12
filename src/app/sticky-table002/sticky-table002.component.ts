import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sticky-table002',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th class="sticky-corner">#</th>
              <th *ngFor="let column of displayedColumns" class="sticky-header" (click)="sortData(column)">
                {{ column | titlecase }}
                <span *ngIf="sortColumn === column">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of sortedData; let i = index">
              <td class="sticky-col">{{ i + 1 }}</td>
              <td *ngFor="let column of displayedColumns">
                {{ getCellValue(row, column) }}
              </td>
            </tr>
          </tbody>
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
      min-width: 1800px;
    }

    th, td {
      padding: 8px 16px;
      border: 1px solid #ccc;
      white-space: nowrap;
      background-color: white;
      background-clip: padding-box;
    }

    .sticky-header {
      position: sticky;
      top: 0;
      background-color: #f8f9fa;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .sticky-col {
      position: sticky;
      left: 0;
      background-color: #f8f9fa;
      z-index: 101;
      box-shadow: 2px 0 4px rgba(0,0,0,0.05);
    }

    .sticky-corner {
      position: sticky;
      top: 0;
      left: 0;
      background-color: #f8f9fa !important;
      z-index: 110 !important;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.15);
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
export class StickyTable002Component {
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  displayedColumns: string[] = [
    'id', 'description', 'workteam', 'country', 'language', 'currency',
    'population', 'religion', 'economy', 'perCapitaIncome', 'nationalSport',
    'nationalAnimal', 'capital', 'updatedBy', 'updatedDate'
  ];

  data: Record<string, string>[] = [
    {
      id: 'US01', description: 'USA Details', workteam: 'Team Alpha', country: 'USA',
      language: 'English', currency: 'USD', population: '331M', religion: 'Christianity',
      economy: 'High', perCapitaIncome: '65,000', nationalSport: 'Baseball',
      nationalAnimal: 'Bald Eagle', capital: 'Washington D.C.',
      updatedBy: 'Admin', updatedDate: '2024-12-01'
    },
    {
      id: 'IN02', description: 'India Info', workteam: 'Team Beta', country: 'India',
      language: 'Hindi', currency: 'INR', population: '1.4B', religion: 'Hinduism',
      economy: 'Developing', perCapitaIncome: '2,100', nationalSport: 'Hockey',
      nationalAnimal: 'Tiger', capital: 'New Delhi',
      updatedBy: 'Editor', updatedDate: '2024-11-20'
    },
      {
        id: 'US01',
        description: 'USA Details',
        workteam: 'Team Alpha',
        country: 'USA',
        language: 'English',
        currency: 'USD',
        population: '331M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '65,000',
        nationalSport: 'Baseball',
        nationalAnimal: 'Bald Eagle',
        capital: 'Washington D.C.',
        updatedBy: 'Admin',
        updatedDate: '2024-12-01'
      },
      {
        id: 'CA02',
        description: 'Canada Details',
        workteam: 'Team Alpha',
        country: 'Canada',
        language: 'English, French',
        currency: 'CAD',
        population: '38M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '48,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Beaver',
        capital: 'Ottawa',
        updatedBy: 'Admin',
        updatedDate: '2024-12-02'
      },
      {
        id: 'MX03',
        description: 'Mexico Details',
        workteam: 'Team Alpha',
        country: 'Mexico',
        language: 'Spanish',
        currency: 'MXN',
        population: '126M',
        religion: 'Catholicism',
        economy: 'Upper Middle',
        perCapitaIncome: '10,000',
        nationalSport: 'Football',
        nationalAnimal: 'Golden Eagle',
        capital: 'Mexico City',
        updatedBy: 'Admin',
        updatedDate: '2024-12-03'
      },
      {
        id: 'GB04',
        description: 'UK Details',
        workteam: 'Team Beta',
        country: 'United Kingdom',
        language: 'English',
        currency: 'GBP',
        population: '67M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '42,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lion',
        capital: 'London',
        updatedBy: 'Editor',
        updatedDate: '2024-12-04'
      },
      {
        id: 'FR05',
        description: 'France Details',
        workteam: 'Team Beta',
        country: 'France',
        language: 'French',
        currency: 'EUR',
        population: '67M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '43,000',
        nationalSport: 'Football',
        nationalAnimal: 'Gallic Rooster',
        capital: 'Paris',
        updatedBy: 'Editor',
        updatedDate: '2024-12-05'
      },
      {
        id: 'DE06',
        description: 'Germany Details',
        workteam: 'Team Beta',
        country: 'Germany',
        language: 'German',
        currency: 'EUR',
        population: '83M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '51,000',
        nationalSport: 'Football',
        nationalAnimal: 'Eagle',
        capital: 'Berlin',
        updatedBy: 'Editor',
        updatedDate: '2024-12-06'
      },
      {
        id: 'IT07',
        description: 'Italy Details',
        workteam: 'Team Beta',
        country: 'Italy',
        language: 'Italian',
        currency: 'EUR',
        population: '60M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '35,000',
        nationalSport: 'Football',
        nationalAnimal: 'Italian Wolf',
        capital: 'Rome',
        updatedBy: 'Editor',
        updatedDate: '2024-12-07'
      },
      {
        id: 'ES08',
        description: 'Spain Details',
        workteam: 'Team Beta',
        country: 'Spain',
        language: 'Spanish',
        currency: 'EUR',
        population: '47M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '30,000',
        nationalSport: 'Football',
        nationalAnimal: 'Bull',
        capital: 'Madrid',
        updatedBy: 'Editor',
        updatedDate: '2024-12-08'
      },
      {
        id: 'JP09',
        description: 'Japan Details',
        workteam: 'Team Gamma',
        country: 'Japan',
        language: 'Japanese',
        currency: 'JPY',
        population: '126M',
        religion: 'Shinto, Buddhism',
        economy: 'High',
        perCapitaIncome: '42,000',
        nationalSport: 'Sumo',
        nationalAnimal: 'Green Pheasant',
        capital: 'Tokyo',
        updatedBy: 'Supervisor',
        updatedDate: '2024-12-09'
      },
      {
        id: 'CN10',
        description: 'China Details',
        workteam: 'Team Gamma',
        country: 'China',
        language: 'Mandarin',
        currency: 'CNY',
        population: '1.4B',
        religion: 'Buddhism, Traditional',
        economy: 'Upper Middle',
        perCapitaIncome: '12,000',
        nationalSport: 'Table Tennis',
        nationalAnimal: 'Giant Panda',
        capital: 'Beijing',
        updatedBy: 'Supervisor',
        updatedDate: '2024-12-10'
      },
      {
        id: 'IN11',
        description: 'India Details',
        workteam: 'Team Gamma',
        country: 'India',
        language: 'Hindi, English',
        currency: 'INR',
        population: '1.38B',
        religion: 'Hinduism',
        economy: 'Lower Middle',
        perCapitaIncome: '2,200',
        nationalSport: 'Cricket',
        nationalAnimal: 'Bengal Tiger',
        capital: 'New Delhi',
        updatedBy: 'Supervisor',
        updatedDate: '2024-12-11'
      },
      {
        id: 'AU12',
        description: 'Australia Details',
        workteam: 'Team Delta',
        country: 'Australia',
        language: 'English',
        currency: 'AUD',
        population: '25M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '56,000',
        nationalSport: 'Cricket',
        nationalAnimal: 'Kangaroo',
        capital: 'Canberra',
        updatedBy: 'Manager',
        updatedDate: '2024-12-12'
      },
      {
        id: 'BR13',
        description: 'Brazil Details',
        workteam: 'Team Delta',
        country: 'Brazil',
        language: 'Portuguese',
        currency: 'BRL',
        population: '211M',
        religion: 'Catholicism',
        economy: 'Upper Middle',
        perCapitaIncome: '8,900',
        nationalSport: 'Football',
        nationalAnimal: 'Jaguar',
        capital: 'Brasília',
        updatedBy: 'Manager',
        updatedDate: '2024-12-13'
      },
      {
        id: 'RU14',
        description: 'Russia Details',
        workteam: 'Team Delta',
        country: 'Russia',
        language: 'Russian',
        currency: 'RUB',
        population: '144M',
        religion: 'Orthodox Christianity',
        economy: 'Upper Middle',
        perCapitaIncome: '12,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Brown Bear',
        capital: 'Moscow',
        updatedBy: 'Manager',
        updatedDate: '2024-12-14'
      },
      {
        id: 'ZA15',
        description: 'South Africa Details',
        workteam: 'Team Delta',
        country: 'South Africa',
        language: '11 official languages',
        currency: 'ZAR',
        population: '59M',
        religion: 'Christianity',
        economy: 'Upper Middle',
        perCapitaIncome: '6,200',
        nationalSport: 'Rugby',
        nationalAnimal: 'Springbok',
        capital: 'Pretoria, Cape Town, Bloemfontein',
        updatedBy: 'Manager',
        updatedDate: '2024-12-15'
      },
      {
        id: 'AR16',
        description: 'Argentina Details',
        workteam: 'Team Delta',
        country: 'Argentina',
        language: 'Spanish',
        currency: 'ARS',
        population: '45M',
        religion: 'Catholicism',
        economy: 'Upper Middle',
        perCapitaIncome: '10,000',
        nationalSport: 'Football',
        nationalAnimal: 'Rufous Hornero',
        capital: 'Buenos Aires',
        updatedBy: 'Manager',
        updatedDate: '2024-12-16'
      },
      {
        id: 'EG17',
        description: 'Egypt Details',
        workteam: 'Team Epsilon',
        country: 'Egypt',
        language: 'Arabic',
        currency: 'EGP',
        population: '100M',
        religion: 'Islam',
        economy: 'Lower Middle',
        perCapitaIncome: '3,600',
        nationalSport: 'Football',
        nationalAnimal: 'Eagle',
        capital: 'Cairo',
        updatedBy: 'Director',
        updatedDate: '2024-12-17'
      },
      {
        id: 'NG18',
        description: 'Nigeria Details',
        workteam: 'Team Epsilon',
        country: 'Nigeria',
        language: 'English',
        currency: 'NGN',
        population: '200M',
        religion: 'Islam, Christianity',
        economy: 'Lower Middle',
        perCapitaIncome: '2,100',
        nationalSport: 'Football',
        nationalAnimal: 'Eagle',
        capital: 'Abuja',
        updatedBy: 'Director',
        updatedDate: '2024-12-18'
      },
      {
        id: 'KE19',
        description: 'Kenya Details',
        workteam: 'Team Epsilon',
        country: 'Kenya',
        language: 'Swahili, English',
        currency: 'KES',
        population: '53M',
        religion: 'Christianity',
        economy: 'Lower Middle',
        perCapitaIncome: '2,000',
        nationalSport: 'Athletics',
        nationalAnimal: 'Lion',
        capital: 'Nairobi',
        updatedBy: 'Director',
        updatedDate: '2024-12-19'
      },
      {
        id: 'SA20',
        description: 'Saudi Arabia Details',
        workteam: 'Team Epsilon',
        country: 'Saudi Arabia',
        language: 'Arabic',
        currency: 'SAR',
        population: '34M',
        religion: 'Islam',
        economy: 'High',
        perCapitaIncome: '23,000',
        nationalSport: 'Football',
        nationalAnimal: 'Arabian Camel',
        capital: 'Riyadh',
        updatedBy: 'Director',
        updatedDate: '2024-12-20'
      },
      {
        id: 'SE21',
        description: 'Sweden Details',
        workteam: 'Team Zeta',
        country: 'Sweden',
        language: 'Swedish',
        currency: 'SEK',
        population: '10M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '55,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Elk',
        capital: 'Stockholm',
        updatedBy: 'Admin',
        updatedDate: '2024-12-21'
      },
      {
        id: 'NO22',
        description: 'Norway Details',
        workteam: 'Team Zeta',
        country: 'Norway',
        language: 'Norwegian',
        currency: 'NOK',
        population: '5.4M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '82,000',
        nationalSport: 'Cross-country Skiing',
        nationalAnimal: 'Lion',
        capital: 'Oslo',
        updatedBy: 'Admin',
        updatedDate: '2024-12-22'
      },
      {
        id: 'FI23',
        description: 'Finland Details',
        workteam: 'Team Zeta',
        country: 'Finland',
        language: 'Finnish, Swedish',
        currency: 'EUR',
        population: '5.5M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '49,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Brown Bear',
        capital: 'Helsinki',
        updatedBy: 'Admin',
        updatedDate: '2024-12-23'
      },
      {
        id: 'DK24',
        description: 'Denmark Details',
        workteam: 'Team Zeta',
        country: 'Denmark',
        language: 'Danish',
        currency: 'DKK',
        population: '5.8M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '61,000',
        nationalSport: 'Football',
        nationalAnimal: 'Red Squirrel',
        capital: 'Copenhagen',
        updatedBy: 'Admin',
        updatedDate: '2024-12-24'
      },
      {
        id: 'SG25',
        description: 'Singapore Details',
        workteam: 'Team Eta',
        country: 'Singapore',
        language: 'English, Mandarin, Malay, Tamil',
        currency: 'SGD',
        population: '5.7M',
        religion: 'Buddhism, Christianity, Islam',
        economy: 'High',
        perCapitaIncome: '65,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lion',
        capital: 'Singapore',
        updatedBy: 'Editor',
        updatedDate: '2024-12-25'
      },
      {
        id: 'KR26',
        description: 'South Korea Details',
        workteam: 'Team Eta',
        country: 'South Korea',
        language: 'Korean',
        currency: 'KRW',
        population: '51M',
        religion: 'Christianity, Buddhism',
        economy: 'High',
        perCapitaIncome: '34,000',
        nationalSport: 'Taekwondo',
        nationalAnimal: 'Tiger',
        capital: 'Seoul',
        updatedBy: 'Editor',
        updatedDate: '2024-12-26'
      },
      {
        id: 'TH27',
        description: 'Thailand Details',
        workteam: 'Team Eta',
        country: 'Thailand',
        language: 'Thai',
        currency: 'THB',
        population: '70M',
        religion: 'Buddhism',
        economy: 'Upper Middle',
        perCapitaIncome: '7,800',
        nationalSport: 'Muay Thai',
        nationalAnimal: 'Elephant',
        capital: 'Bangkok',
        updatedBy: 'Editor',
        updatedDate: '2024-12-27'
      },
      {
        id: 'VN28',
        description: 'Vietnam Details',
        workteam: 'Team Eta',
        country: 'Vietnam',
        language: 'Vietnamese',
        currency: 'VND',
        population: '96M',
        religion: 'Buddhism',
        economy: 'Lower Middle',
        perCapitaIncome: '3,600',
        nationalSport: 'Football',
        nationalAnimal: 'Water Buffalo',
        capital: 'Hanoi',
        updatedBy: 'Editor',
        updatedDate: '2024-12-28'
      },
      {
        id: 'PH29',
        description: 'Philippines Details',
        workteam: 'Team Eta',
        country: 'Philippines',
        language: 'Filipino, English',
        currency: 'PHP',
        population: '109M',
        religion: 'Catholicism',
        economy: 'Lower Middle',
        perCapitaIncome: '3,500',
        nationalSport: 'Basketball',
        nationalAnimal: 'Carabao',
        capital: 'Manila',
        updatedBy: 'Editor',
        updatedDate: '2024-12-29'
      },
      {
        id: 'NZ30',
        description: 'New Zealand Details',
        workteam: 'Team Theta',
        country: 'New Zealand',
        language: 'English, Māori',
        currency: 'NZD',
        population: '5M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '42,000',
        nationalSport: 'Rugby',
        nationalAnimal: 'Kiwi',
        capital: 'Wellington',
        updatedBy: 'Supervisor',
        updatedDate: '2024-12-30'
      },
      {
        id: 'GR31',
        description: 'Greece Details',
        workteam: 'Team Theta',
        country: 'Greece',
        language: 'Greek',
        currency: 'EUR',
        population: '10.7M',
        religion: 'Orthodox Christianity',
        economy: 'High',
        perCapitaIncome: '20,000',
        nationalSport: 'Football',
        nationalAnimal: 'Dolphin',
        capital: 'Athens',
        updatedBy: 'Supervisor',
        updatedDate: '2024-12-31'
      },
      {
        id: 'PT32',
        description: 'Portugal Details',
        workteam: 'Team Theta',
        country: 'Portugal',
        language: 'Portuguese',
        currency: 'EUR',
        population: '10.3M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '23,000',
        nationalSport: 'Football',
        nationalAnimal: 'Iberian Wolf',
        capital: 'Lisbon',
        updatedBy: 'Supervisor',
        updatedDate: '2025-01-01'
      },
      {
        id: 'IE33',
        description: 'Ireland Details',
        workteam: 'Team Theta',
        country: 'Ireland',
        language: 'English, Irish',
        currency: 'EUR',
        population: '4.9M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '85,000',
        nationalSport: 'Gaelic Football',
        nationalAnimal: 'Irish Elk',
        capital: 'Dublin',
        updatedBy: 'Supervisor',
        updatedDate: '2025-01-02'
      },
      {
        id: 'BE34',
        description: 'Belgium Details',
        workteam: 'Team Iota',
        country: 'Belgium',
        language: 'Dutch, French, German',
        currency: 'EUR',
        population: '11.5M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '47,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lion',
        capital: 'Brussels',
        updatedBy: 'Manager',
        updatedDate: '2025-01-03'
      },
      {
        id: 'NL35',
        description: 'Netherlands Details',
        workteam: 'Team Iota',
        country: 'Netherlands',
        language: 'Dutch',
        currency: 'EUR',
        population: '17.5M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '53,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lion',
        capital: 'Amsterdam',
        updatedBy: 'Manager',
        updatedDate: '2025-01-04'
      },
      {
        id: 'LU36',
        description: 'Luxembourg Details',
        workteam: 'Team Iota',
        country: 'Luxembourg',
        language: 'Luxembourgish, French, German',
        currency: 'EUR',
        population: '0.6M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '115,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lion',
        capital: 'Luxembourg City',
        updatedBy: 'Manager',
        updatedDate: '2025-01-05'
      },
      {
        id: 'CH37',
        description: 'Switzerland Details',
        workteam: 'Team Iota',
        country: 'Switzerland',
        language: 'German, French, Italian, Romansh',
        currency: 'CHF',
        population: '8.6M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '87,000',
        nationalSport: 'Football',
        nationalAnimal: 'St. Bernard Dog',
        capital: 'Bern',
        updatedBy: 'Manager',
        updatedDate: '2025-01-06'
      },
      {
        id: 'AT38',
        description: 'Austria Details',
        workteam: 'Team Iota',
        country: 'Austria',
        language: 'German',
        currency: 'EUR',
        population: '8.9M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '52,000',
        nationalSport: 'Football',
        nationalAnimal: 'Eagle',
        capital: 'Vienna',
        updatedBy: 'Manager',
        updatedDate: '2025-01-07'
      },
      {
        id: 'PL39',
        description: 'Poland Details',
        workteam: 'Team Kappa',
        country: 'Poland',
        language: 'Polish',
        currency: 'PLN',
        population: '38M',
        religion: 'Catholicism',
        economy: 'High',
        perCapitaIncome: '17,000',
        nationalSport: 'Football',
        nationalAnimal: 'White-tailed Eagle',
        capital: 'Warsaw',
        updatedBy: 'Director',
        updatedDate: '2025-01-08'
      },
      {
        id: 'CZ40',
        description: 'Czech Republic Details',
        workteam: 'Team Kappa',
        country: 'Czech Republic',
        language: 'Czech',
        currency: 'CZK',
        population: '10.7M',
        religion: 'Atheism, Christianity',
        economy: 'High',
        perCapitaIncome: '23,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Double-tailed Lion',
        capital: 'Prague',
        updatedBy: 'Director',
        updatedDate: '2025-01-09'
      },
      {
        id: 'SK41',
        description: 'Slovakia Details',
        workteam: 'Team Kappa',
        country: 'Slovakia',
        language: 'Slovak',
        currency: 'EUR',
        population: '5.5M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '20,000',
        nationalSport: 'Ice Hockey',
        nationalAnimal: 'Eagle',
        capital: 'Bratislava',
        updatedBy: 'Director',
        updatedDate: '2025-01-10'
      },
      {
        id: 'HU42',
        description: 'Hungary Details',
        workteam: 'Team Kappa',
        country: 'Hungary',
        language: 'Hungarian',
        currency: 'HUF',
        population: '9.8M',
        religion: 'Christianity',
        economy: 'High',
        perCapitaIncome: '17,000',
        nationalSport: 'Water Polo',
        nationalAnimal: 'Turul',
        capital: 'Budapest',
        updatedBy: 'Director',
        updatedDate: '2025-01-11'
      },
      {
        id: 'RO43',
        description: 'Romania Details',
        workteam: 'Team Kappa',
        country: 'Romania',
        language: 'Romanian',
        currency: 'RON',
        population: '19.3M',
        religion: 'Orthodox Christianity',
        economy: 'Upper Middle',
        perCapitaIncome: '13,000',
        nationalSport: 'Football',
        nationalAnimal: 'Lynx',
        capital: 'Bucharest',
        updatedBy: 'Director',
        updatedDate: '2025-01-12'
      },
      {
        id: 'TR44',
        description: 'Turkey Details',
        workteam: 'Team Lambda',
        country: 'Turkey',
        language: 'Turkish',
        currency: 'TRY',
        population: '83M',
        religion: 'Islam',
        economy: 'Upper Middle',
        perCapitaIncome: '9,000',
        nationalSport: 'Wrestling',
        nationalAnimal: 'Gray Wolf',
        capital: 'Ankara',
        updatedBy: 'Admin',
        updatedDate: '2025-01-13'
      },
      {
        id: 'IL45',
        description: 'Israel Details',
        workteam: 'Team Lambda',
        country: 'Israel',
        language: 'Hebrew, Arabic',
        currency: 'ILS',
        population: '9.2M',
        religion: 'Judaism',
        economy: 'High',
        perCapitaIncome: '44,000',
        nationalSport: 'Football',
        nationalAnimal: 'Gazelle',
        capital: 'Jerusalem',
        updatedBy: 'Admin',
        updatedDate: '2025-01-14'
      },
      {
        id: 'AE46',
        description: 'UAE Details',
        workteam: 'Team Lambda',
        country: 'United Arab Emirates',
        language: 'Arabic',
        currency: 'AED',
        population: '9.9M',
        religion: 'Islam',
        economy: 'High',
        perCapitaIncome: '43,000',
        nationalSport: 'Football',
        nationalAnimal: 'Arabian Oryx',
        capital: 'Abu Dhabi',
        updatedBy: 'Admin',
        updatedDate: '2025-01-15'
      },
      {
        id: 'QA47',
        description: 'Qatar Details',
        workteam: 'Team Lambda',
        country: 'Qatar',
        language: 'Arabic',
        currency: 'QAR',
        population: '2.8M',
        religion: 'Islam',
        economy: 'High',
        perCapitaIncome: '62,000',
        nationalSport: 'Football',
        nationalAnimal: 'Arabian Oryx',
        capital: 'Doha',
        updatedBy: 'Admin',
        updatedDate: '2025-01-16'
      },
      {
        id: 'KW48',
        description: 'Kuwait Details',
        workteam: 'Team Lambda',
        country: 'Kuwait',
        language: 'Arabic',
        currency: 'KWD',
        population: '4.2M',
        religion: 'Islam',
        economy: 'High',
        perCapitaIncome: '32,000',
        nationalSport: 'Football',
        nationalAnimal: 'Arabian Camel',
        capital: 'Kuwait City',
        updatedBy: 'Admin',
        updatedDate: '2025-01-17'
      },
      {
        id: 'MA49',
        description: 'Morocco Details',
        workteam: 'Team Mu',
        country: 'Morocco',
        language: 'Arabic, Berber',
        currency: 'MAD',
        population: '36M',
        religion: 'Islam',
        economy: 'Lower Middle',
        perCapitaIncome: '3,400',
        nationalSport: 'Football',
        nationalAnimal: 'Barbary Lion',
        capital: 'Rabat',
        updatedBy: 'Editor',
        updatedDate: '2025-01-18'
      },
      {
        id: 'TN50',
        description: 'Tunisia Details',
        workteam: 'Team Mu',
        country: 'Tunisia',
        language: 'Arabic',
        currency: 'TND',
        population: '11.7M',
        religion: 'Islam',
        economy: 'Lower Middle',
        perCapitaIncome: '3,500',
        nationalSport: 'Football',
        nationalAnimal: 'Eagle',
        capital: 'Tunis',
        updatedBy: 'Editor',
        updatedDate: '2025-01-19'
      },
      {
        id: 'DZ51',
        description: 'Algeria Details',
        workteam: 'Team Mu',
        country: 'Algeria',
        language: 'Arabic, Berber',
        currency: 'DZD',
        population: '43M',
        religion: 'Islam',
        economy: 'Upper Middle',
        perCapitaIncome: '3,900',
        nationalSport: 'Football',
        nationalAnimal: 'Fennec Fox',
        capital: 'Algiers',
        updatedBy: 'Editor',
        updatedDate: '2025-01-20'
      }
  ];

  get sortedData() {
    if (!this.sortColumn) return this.data;
    return [...this.data].sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  sortData(column: string) {
    if (column === 'id') return; // Disable sorting on # column
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getCellValue(row: Record<string, string>, column: string): string {
    return row[column] ?? '';
  }
}

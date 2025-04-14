import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DetailsDataService } from './services/details-data.service';
import { LoaderService } from './services/loader.service';
import { UtilityService } from './services/utility.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;

  let mockDetailsService: jasmine.SpyObj<Pick<DetailsDataService, 'getDetailsData'>>;
  let mockLoaderService: jasmine.SpyObj<Pick<LoaderService, 'showLoader' | 'hideLoader'>>;
  let mockUtilityService: jasmine.SpyObj<Pick<UtilityService, 'downloadFile'>>;

  beforeEach(async () => {
    mockDetailsService = jasmine.createSpyObj('DetailsDataService', ['getDetailsData']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['downloadFile']);

    await TestBed.configureTestingModule({
      declarations: [EclipseAthenaDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DetailsDataService, useValue: mockDetailsService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: UtilityService, useValue: mockUtilityService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize log data and default tab', () => {
    mockDetailsService.getDetailsData.and.returnValue(of([{ label: 'Status', value: 'OK' }]));
    component.ngOnInit();
    expect(mockDetailsService.getDetailsData).toHaveBeenCalled();
  });

  it('should set isPrimaryTabActive true when log-tab is selected', () => {
    component.onSelectedChange('log-tab', 100);
    expect(component.isPrimaryTabActive).toBeTrue();
    expect(component.isSecondaryTabActive).toBeFalse();
  });

  it('should load details data when details-tab is selected', () => {
    const mockData = [{ label: 'Step', value: 'FINISHED' }];
    mockDetailsService.getDetailsData.and.returnValue(of(mockData));

    component.onSelectedChange('details-tab', 200);
    expect(component.detailsData).toEqual(mockData);
    expect(component.isPrimaryTabActive).toBeFalse();
    expect(component.isSecondaryTabActive).toBeTrue();
    expect(component.hasError).toBeFalse();
  });

  it('should handle service error for details-tab', () => {
    mockDetailsService.getDetailsData.and.returnValue(throwError(() => new Error('Failure')));
    component.onSelectedChange('details-tab', 300);
    expect(component.hasError).toBeTrue();
    expect(component.detailsData).toEqual([]);
  });

  it('should emit closeDialog on onDialogCloseIconClick', () => {
    spyOn(component.closeDialog, 'emit');
    component.onDialogCloseIconClick();
    expect(component.closeDialog.emit).toHaveBeenCalled();
  });

  it('should emit closeDialog on onCloseDialogEvent', () => {
    spyOn(component.closeDialog, 'emit');
    component.onCloseDialogEvent();
    expect(component.closeDialog.emit).toHaveBeenCalled();
  });

  it('should call UtilityService.downloadFile with monId', () => {
    component.monId = 999;
    component.downloadFile();
    expect(mockUtilityService.downloadFile).toHaveBeenCalledWith(999);
  });

  it('should render loader when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loader = fixture.nativeElement.querySelector('.loader-gif');
    expect(loader).toBeTruthy();
  });

  it('should render details when secondary tab active and no error', () => {
    component.isSecondaryTabActive = true;
    component.detailsData = [{ label: 'Result', value: 'PASS' }];
    component.hasError = false;
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('.value');
    expect(value.textContent).toContain('PASS');
  });

  it('should render log content when primary tab active', () => {
    component.isPrimaryTabActive = true;
    component.logContent = 'Test log here';
    fixture.detectChanges();

    const textArea = fixture.nativeElement.querySelector('textarea');
    expect(textArea.textContent).toContain('Test log here');
  });

  it('should show error image and message when hasError is true and no tab active', () => {
    component.isPrimaryTabActive = false;
    component.isSecondaryTabActive = false;
    component.hasError = true;
    component.errorMessage = 'Something went wrong';
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('.second-msg');
    expect(message.textContent).toContain('Something went wrong');
  });
});

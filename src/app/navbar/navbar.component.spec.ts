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

  let mockDetailsService: jasmine.SpyObj<DetailsDataService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;

  beforeEach(async () => {
    mockDetailsService = jasmine.createSpyObj('DetailsDataService', ['getDetailsData']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['downloadFile']);

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DetailsDataService, useValue: mockDetailsService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: UtilityService, useValue: mockUtilityService },
      ],
      declarations: [EclipseAthenaDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // To ignore unknown Athena Core tags
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data correctly on ngOnInit()', () => {
    mockDetailsService.getDetailsData.and.returnValue(of([
      { label: 'Status', value: 'OK' }
    ]));
    component.ngOnInit();
    expect(mockDetailsService.getDetailsData).toHaveBeenCalled();
  });

  it('should handle tab change to primary tab', () => {
    component.onSelectedChange('log-tab', 123);
    expect(component.isPrimaryTabActive).toBeTrue();
    expect(component.isSecondaryTabActive).toBeFalse();
  });

  it('should handle tab change to secondary tab and call service', () => {
    mockDetailsService.getDetailsData.and.returnValue(of([
      { label: 'Step', value: 'COMPLETED' }
    ]));
    component.onSelectedChange('details-tab', 456);
    expect(component.isPrimaryTabActive).toBeFalse();
    expect(component.isSecondaryTabActive).toBeTrue();
    expect(mockDetailsService.getDetailsData).toHaveBeenCalledWith(456);
  });

  it('should show error UI on error response for details tab', () => {
    mockDetailsService.getDetailsData.and.returnValue(throwError(() => new Error('Service error')));
    component.onSelectedChange('details-tab', 789);
    expect(component.hasError).toBeTrue();
  });

  it('should close dialog on onCloseDialogEvent()', () => {
    const closeSpy = spyOn(component.closeDialog, 'emit');
    component.onCloseDialogEvent();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should close dialog on onDialogCloseIconClick()', () => {
    const closeSpy = spyOn(component.closeDialog, 'emit');
    component.onDialogCloseIconClick();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call downloadFile() and utility service', () => {
    component.monId = 111;
    component.downloadFile();
    expect(mockUtilityService.downloadFile).toHaveBeenCalledWith(111);
  });

  it('should render primary tab log section', () => {
    component.isPrimaryTabActive = true;
    component.isLoading = false;
    component.logArray1 = [{ label: 'Log1', value: 'Value1' }];
    component.logArray2 = [{ label: 'Log2', value: 'Value2' }];
    component.logContent = 'Log content here';
    fixture.detectChanges();

    const textArea = fixture.nativeElement.querySelector('textarea');
    expect(textArea.textContent).toContain('Log content here');
  });

  it('should render secondary tab details', () => {
    component.isSecondaryTabActive = true;
    component.isLoading = false;
    component.detailsData = [{ label: 'Step', value: 'COMPLETED' }];
    fixture.detectChanges();

    const valueCell = fixture.nativeElement.querySelector('.value');
    expect(valueCell.textContent).toContain('COMPLETED');
  });

  it('should show loader when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loaderImg = fixture.nativeElement.querySelector('.loader-gif');
    expect(loaderImg).toBeTruthy();
  });

  it('should display error image and message when no tab is active and has error', () => {
    component.isPrimaryTabActive = false;
    component.isSecondaryTabActive = false;
    component.hasError = true;
    component.errorMessage = 'Something went wrong';
    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.second-msg');
    expect(errorMsg.textContent).toContain('Something went wrong');
  });
});

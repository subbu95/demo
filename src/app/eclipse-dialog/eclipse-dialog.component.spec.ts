import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { DetailsDataService } from '../../../services/details-data.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilityService } from '../../../services/utility.service';
import { SnackbarService } from '@nielseniq/athena-core';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DialogComponent } from '@nielseniq/athena-core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;
  let detailsDataService: jasmine.SpyObj<DetailsDataService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const detailsDataServiceSpy = jasmine.createSpyObj('DetailsDataService', ['getJobDetails', 'getJobLogDetails', 'downloadFile']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['getNIQLoader']);
    const utilityServiceSpy = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [EclipseAthenaDialogComponent],
      providers: [
        { provide: DetailsDataService, useValue: detailsDataServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: UtilityService, useValue: utilityServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    detailsDataService = TestBed.inject(DetailsDataService) as jasmine.SpyObj<DetailsDataService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    snackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog and load job log data on openDialog call', () => {
    spyOn(component, 'onSelectedChange');
    component.openDialog(123);
    expect(component.dialogBox.open).toHaveBeenCalled();
    expect(component.isLoading).toBeTrue();
    expect(component.onSelectedChange).toHaveBeenCalledWith(component.primaryTab, 123);
  });

  it('should handle tab selection change', () => {
    spyOn(component, 'getJobLogData');
    spyOn(component, 'getDetailsData');

    component.onSelectedChange('details', 123);
    expect(component.getDetailsData).toHaveBeenCalled();

    component.onSelectedChange('jobLog', 123);
    expect(component.getJobLogData).toHaveBeenCalledWith(123);
  });

  it('should fetch job details data successfully', fakeAsync(() => {
    const mockDetails = { body: { key: 'value' } };
    detailsDataService.getJobDetails.and.returnValue(of(mockDetails));

    component.getDetailsData();
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.detailsData.length).toBeGreaterThan(0);
    expect(component.isDetailsAPICalled).toBeTrue();
  }));

  it('should handle error when fetching job details data', fakeAsync(() => {
    const mockError = { error: { status: { errors: [{ code: '500', message: 'Error' }] } } };
    detailsDataService.getJobDetails.and.returnValue(throwError(() => mockError));

    component.getDetailsData();
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.hasError).toBeTrue();
    expect(component.errorCode).toBe('500');
    expect(component.errorMessage).toBe('Error');
  }));

  it('should fetch job log data successfully', fakeAsync(() => {
    const mockJobLog = { body: { isTruncated: false, session: {}, uproc: {}, logContent: 'log' } };
    detailsDataService.getJobLogDetails.and.returnValue(of(mockJobLog));

    component.getJobLogData(123);
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.isJobLogAPICalled).toBeTrue();
    expect(component.logContent).toBe('log');
  }));

  it('should handle error when fetching job log data', fakeAsync(() => {
    const mockError = { error: { status: { errors: [{ code: '500', message: 'Error' }] } } };
    detailsDataService.getJobLogDetails.and.returnValue(throwError(() => mockError));

    component.getJobLogData(123);
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.hasError).toBeTrue();
    expect(component.errorCode).toBe('500');
    expect(component.errorMessage).toBe('Error');
  }));

  it('should download file successfully', fakeAsync(() => {
    const mockBlob = new Blob(['test'], { type: 'text/plain' });
    detailsDataService.downloadFile.and.returnValue(of(mockBlob));
    spyOn(window, 'saveAs');

    component.downloadFile();
    tick();

    expect(window.saveAs).toHaveBeenCalled();
    expect(utilityService.openSnackBar).toHaveBeenCalledWith(
      'large',
      'success',
      'File downloading begins. It will take few minutes.',
      'success'
    );
  }));

  it('should handle error when downloading file', fakeAsync(() => {
    const mockError = { error: { error: 'Download error' } };
    detailsDataService.downloadFile.and.returnValue(throwError(() => mockError));

    component.downloadFile();
    tick();

    expect(snackbarService.open).toHaveBeenCalledWith(
      'large',
      'error',
      'Download error',
      'download',
      { dismissAfter: 4000 }
    );
  }));

  it('should reset dialog state on resetEclipseDialog call', () => {
    spyOn(component.stepDetailsSubscription, 'unsubscribe');
    spyOn(component.jobLogSubscription, 'unsubscribe');
    spyOn(component.saveLogSubscription, 'unsubscribe');

    component.reset
::contentReference[oaicite:0]{index=0}
 

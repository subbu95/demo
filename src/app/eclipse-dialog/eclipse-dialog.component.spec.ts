import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { DetailsDataService } from '../../../services/details-data.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilityService } from '../../../services/utility.service';
import { SnackbarService } from '@nielseniq/athena-core';
import { DialogComponent } from '@nielseniq/athena-core';

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;
  let detailsService: jasmine.SpyObj<DetailsDataService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let utilService: jasmine.SpyObj<UtilityService>;
  let snackbar: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const detailsServiceSpy = jasmine.createSpyObj('DetailsDataService', ['getJobDetails', 'getJobLogDetails', 'downloadFile']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['getNIQLoader']);
    const utilServiceSpy = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    const snackbarSpy = jasmine.createSpyObj('SnackbarService', ['open']);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DetailsDataService, useValue: detailsServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: UtilityService, useValue: utilServiceSpy },
        { provide: SnackbarService, useValue: snackbarSpy }
      ],
      imports: [EclipseAthenaDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    detailsService = TestBed.inject(DetailsDataService) as jasmine.SpyObj<DetailsDataService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    utilService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    snackbar = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;

    loaderService.getNIQLoader.and.returnValue('loader-img');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog and fetch job log data', () => {
    spyOn(component, 'onSelectedChange');
    component.openDialog(123);
    expect(component.onSelectedChange).toHaveBeenCalledWith('jobLog', 123);
  });

  it('should call confirm and emit confirmation', () => {
    spyOn(component.confirmEvent, 'emit');
    component.dialogBox = { close: jasmine.createSpy('close') } as any;
    component.confirm();
    expect(component.confirmEvent.emit).toHaveBeenCalledWith('Confirmation');
    expect(component.dialogBox.close).toHaveBeenCalled();
  });

  it('should switch to secondary tab and call getDetailsData', () => {
    spyOn(component, 'getDetailsData');
    component.onSelectedChange('details', 1);
    expect(component.getDetailsData).toHaveBeenCalled();
    expect(component.tabSelected).toBe('details');
  });

  it('should switch to primary tab and call getJobLogData', () => {
    spyOn(component, 'getJobLogData');
    component.onSelectedChange('jobLog', 1);
    expect(component.getJobLogData).toHaveBeenCalledWith(1);
    expect(component.tabSelected).toBe('jobLog');
  });

  it('should handle getDetailsData success', () => {
    const mockData = { body: { key1: 'value1' } };
    (detailsService.getJobDetails as jasmine.Spy).and.returnValue(of(mockData));
    component.monId = 1;
    component.detailsPath = 'path';
    component.getDetailsData();
    expect(component.isDetailsAPICalled).toBeTrue();
  });

  it('should handle getDetailsData error', () => {
    const err = { error: { status: { errors: [{ code: '404', message: 'Not found' }], responseStatus: 'FAIL' } } };
    (detailsService.getJobDetails as jasmine.Spy).and.returnValue(throwError(() => err));
    component.monId = 1;
    component.detailsPath = 'path';
    component.getDetailsData();
    expect(component.hasError).toBeTrue();
    expect(component.errorCode).toContain('404');
    expect(component.errorMessage).toBe('Not found');
  });

  it('should handle getJobLogData success', () => {
    const body = {
      isTruncated: false,
      logContent: 'logs',
      session: 's1',
      uproc: 'u1'
    };
    (detailsService.getJobLogDetails as jasmine.Spy).and.returnValue(of({ body }));
    component.getJobLogData(1);
    expect(component.jobLogDetails).toEqual(body);
    expect(component.isJobLogAPICalled).toBeTrue();
  });

  it('should handle getJobLogData error', () => {
    const err = { error: { status: { errors: [{ code: '500', message: 'Internal Error' }] } } };
    (detailsService.getJobLogDetails as jasmine.Spy).and.returnValue(throwError(() => err));
    component.getJobLogData(1);
    expect(component.hasError).toBeTrue();
    expect(component.errorMessage).toContain('Internal Error');
  });

  it('should handle downloadFile success', () => {
    const blob = new Blob(['file content']);
    (detailsService.downloadFile as jasmine.Spy).and.returnValue(of(blob));
    component.monId = 1;
    component.sessionName = 's';
    component.uproc = 'u';
    component.downloadFile();
    expect(utilService.openSnackBar).toHaveBeenCalled();
  });

  it('should handle downloadFile error', () => {
    const err = { error: { error: 'Download failed' } };
    (detailsService.downloadFile as jasmine.Spy).and.returnValue(throwError(() => err));
    component.downloadFile();
    expect(snackbar.open).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component.stepDetailsSubscription, 'unsubscribe');
    spyOn(component.jobLogSubscription, 'unsubscribe');
    spyOn(component.saveLogSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.stepDetailsSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.jobLogSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.saveLogSubscription.unsubscribe).toHaveBeenCalled();
  });
});

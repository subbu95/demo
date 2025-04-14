import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { DialogModule, DialogComponent, IconModule, TabModule, CalloutModule, IconButtonModule, SnackbarService } from '@nielseniq/athena-core';
import { CommonModule } from '@angular/common';
import { DetailsDataService } from '../../../services/details-data.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilityService } from '../../../services/utility.service';
import { of, throwError } from 'rxjs';
import { CONSTANTS } from '../../../../assets/app.constants';
import { JobLogDataModel } from '../../../models/fup/job-log.model';
import { DetailsModel } from '../../../models/fup/details.model';
import { Result } from '../../../models/common/result.model';

// Mock file-saver
class MockFileSaver {
  static saveAs = jasmine.createSpy('saveAs');
}

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;
  let detailsDataService: jasmine.SpyObj<DetailsDataService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  const mockJobLogData: JobLogDataModel = {
    status: {
      timestamp: '2023-01-01',
      responseStatus: 'OK',
      responseCode: '200'
    },
    body: {
      company: 'Test Company',
      node: 'Test Node',
      uproc: 'Test Uproc',
      session: 'Test Session',
      management_Unit: 'Test Unit',
      uproc_number: 123,
      session_number: 456,
      launch: 'Test Launch',
      monId: 789,
      logContent: 'Test log content',
      isTruncated: true
    }
  };

  const mockDetailsData: DetailsModel = {
    status: {
      timestamp: '2023-01-01',
      responseStatus: 'OK',
      responseCode: '200'
    },
    body: {
      session: 'Test Session',
      week: 'Test Week',
      step: 'Test Step',
      status: 'OK',
      result: 'SUCCESS',
      execution_server: 'Test Server',
      unix_process: '12345',
      job_id: 'JOB123',
      management_unit: 'Test Unit',
      command_line: 'test command'
    }
  };

  beforeEach(async () => {
    // Create spy objects
    const detailsDataServiceSpy = jasmine.createSpyObj('DetailsDataService', 
      ['getJobLogDetails', 'getJobDetails', 'downloadFile']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['getNIQLoader']);
    const utilityServiceSpy = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DialogModule,
        IconModule,
        TabModule,
        CalloutModule,
        IconButtonModule
      ],
      declarations: [EclipseAthenaDialogComponent],
      providers: [
        { provide: DetailsDataService, useValue: detailsDataServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: UtilityService, useValue: utilityServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: 'FileSaver', useValue: MockFileSaver }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    
    // Get injected services
    detailsDataService = TestBed.inject(DetailsDataService) as jasmine.SpyObj<DetailsDataService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    snackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;

    // Configure default return values
    detailsDataService.getJobLogDetails.and.returnValue(of(mockJobLogData));
    detailsDataService.getJobDetails.and.returnValue(of(mockDetailsData));
    detailsDataService.downloadFile.and.returnValue(of(new Blob(['test content'])));
    loaderService.getNIQLoader.and.returnValue('loader-image-path');

    // Initialize component inputs
    component.title = 'Test Title';
    component.monId = 123;
    component.detailsPath = 'test/path';
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.primaryTabTitle).toBe(CONSTANTS.PRIMARY_TAB_TITLE);
    expect(component.secondaryTabTitle).toBe(CONSTANTS.SECONDARY_TAB_TITLE);
    expect(component.tabSelected).toBe(component.primaryTab);
    expect(component.genericErrMsg).toBe(CONSTANTS.ERROR_MESSAGES.GENERIC_DATA_MESSAGE);
    expect(component.NIQLoaderImage).toBe('loader-image-path');
  });

  describe('openDialog', () => {
    it('should open dialog and load job log data', () => {
      const dialogOpenSpy = spyOn(component.dialogBox, 'open');
      component.openDialog(123);
      
      expect(dialogOpenSpy).toHaveBeenCalled();
      expect(component.isLoading).toBeTrue();
      expect(detailsDataService.getJobLogDetails).toHaveBeenCalledWith(123);
    });
  });

  describe('onCloseDialogEvent', () => {
    it('should reset API call flags', () => {
      component.isDetailsAPICalled = true;
      component.isJobLogAPICalled = true;
      
      component.onCloseDialogEvent();
      
      expect(component.isDetailsAPICalled).toBeFalse();
      expect(component.isJobLogAPICalled).toBeFalse();
    });
  });

  describe('onDialogCloseIconClick', () => {
    it('should reset API call flags', () => {
      component.isDetailsAPICalled = true;
      component.isJobLogAPICalled = true;
      
      component.onDialogCloseIconClick();
      
      expect(component.isDetailsAPICalled).toBeFalse();
      expect(component.isJobLogAPICalled).toBeFalse();
    });
  });

  describe('onSelectedChange', () => {
    it('should load details data when secondary tab is selected', () => {
      component.onSelectedChange(component.secondaryTab, 123);
      
      expect(component.tabSelected).toBe(component.secondaryTab);
      expect(component.isPrimaryTabActive).toBeFalse();
      expect(component.isSecondaryTabActive).toBeTrue();
      expect(detailsDataService.getJobDetails).toHaveBeenCalledWith(123, 'test/path');
    });

    it('should not call details API if already called', () => {
      component.isDetailsAPICalled = true;
      component.onSelectedChange(component.secondaryTab, 123);
      
      expect(detailsDataService.getJobDetails).not.toHaveBeenCalled();
    });

    it('should load job log data when primary tab is selected', () => {
      component.onSelectedChange(component.primaryTab, 123);
      
      expect(component.tabSelected).toBe(component.primaryTab);
      expect(component.isPrimaryTabActive).toBeTrue();
      expect(component.isSecondaryTabActive).toBeFalse();
      expect(detailsDataService.getJobLogDetails).toHaveBeenCalledWith(123);
    });

    it('should not call job log API if already called', () => {
      component.isJobLogAPICalled = true;
      component.onSelectedChange(component.primaryTab, 123);
      
      expect(detailsDataService.getJobLogDetails).not.toHaveBeenCalled();
    });
  });

  describe('getDetailsData', () => {
    it('should populate detailsData correctly', fakeAsync(() => {
      component.getDetailsData();
      tick();
      
      expect(component.detailsData.length).toBeGreaterThan(0);
      expect(component.detailsData[0]).toEqual({
        label: 'Session',
        value: 'Test Session'
      } as Result);
      expect(component.isDetailsAPICalled).toBeTrue();
      expect(component.isLoading).toBeFalse();
    }));

    it('should handle error when getting details data', fakeAsync(() => {
      const errorResponse = {
        error: {
          status: {
            errors: [{
              code: '500',
              message: 'Test Error'
            }],
            responseStatus: 'ERROR'
          }
        }
      };
      detailsDataService.getJobDetails.and.returnValue(throwError(() => errorResponse));
      
      component.getDetailsData();
      tick();
      
      expect(component.isLoading).toBeFalse();
      expect(component.isSecondaryTabActive).toBeFalse();
      expect(component.hasError).toBeTrue();
      expect(component.errorCode).toBe('500 ERROR');
      expect(component.errorMessage).toBe('Test Error');
    }));
  });

  describe('getJobLogData', () => {
    it('should populate job log data correctly', fakeAsync(() => {
      component.getJobLogData(123);
      tick();
      
      expect(component.logArray1.length).toBeGreaterThan(0);
      expect(component.logArray2.length).toBeGreaterThan(0);
      expect(component.logContent).toBe('Test log content');
      expect(component.isLogTruncated).toBeTrue();
      expect(component.isJobLogAPICalled).toBeTrue();
      expect(component.isLoading).toBeFalse();
    }));

    it('should handle empty response body', fakeAsync(() => {
      const emptyResponse: JobLogDataModel = {
        status: {
          timestamp: '2023-01-01',
          responseStatus: 'OK',
          responseCode: '200'
        },
        body: null as any
      };
      detailsDataService.getJobLogDetails.and.returnValue(of(emptyResponse));
      
      component.getJobLogData(123);
      tick();
      
      expect(component.hasError).toBeTrue();
      expect(component.errorCode).toBe('200');
      expect(component.errorMessage).toBe('Something went wrong, Empty response received');
    }));

    it('should handle error when getting job log data', fakeAsync(() => {
      const errorResponse = {
        error: {
          status: {
            errors: [{
              code: '404',
              message: 'Not Found'
            }],
            responseStatus: 'ERROR'
          }
        }
      };
      detailsDataService.getJobLogDetails.and.returnValue(throwError(() => errorResponse));
      
      component.getJobLogData(123);
      tick();
      
      expect(component.isLoading).toBeFalse();
      expect(component.isPrimaryTabActive).toBeFalse();
      expect(component.hasError).toBeTrue();
      expect(component.errorCode).toBe('404');
      expect(component.errorMessage).toBe('Not Found');
    }));

    it('should handle generic error when error structure is unexpected', fakeAsync(() => {
      detailsDataService.getJobLogDetails.and.returnValue(throwError(() => new Error('Test Error')));
      
      component.getJobLogData(123);
      tick();
      
      expect(component.errorCode).toBe('500');
      expect(component.errorMessage).toBe('Something went wrong, please contact support team');
    }));
  });

  describe('downloadFile', () => {
    it('should download file successfully', fakeAsync(() => {
      component.sessionName = 'TestSession';
      component.uproc = 'TestUproc';
      component.monId = 123;
      
      component.downloadFile();
      tick();
      
      expect(detailsDataService.downloadFile).toHaveBeenCalledWith(123, 'TestSession', 'TestUproc');
      expect(MockFileSaver.saveAs).toHaveBeenCalled();
      expect(utilityService.openSnackBar).toHaveBeenCalledWith(
        'large',
        'success',
        'File downloading begins.It will take few minutes.',
        'success'
      );
    }));

    it('should handle download error with specific error message', fakeAsync(() => {
      const errorResponse = {
        error: {
          error: 'Download failed'
        }
      };
      detailsDataService.downloadFile.and.returnValue(throwError(() => errorResponse));
      
      component.downloadFile();
      tick();
      
      expect(snackbarService.open).toHaveBeenCalledWith(
        'large',
        'error',
        'Download failed',
        'download',
        { dismissAfter: 4000 }
      );
    }));

    it('should handle download error with generic error message', fakeAsync(() => {
      detailsDataService.downloadFile.and.returnValue(throwError(() => new Error('Test Error')));
      
      component.downloadFile();
      tick();
      
      expect(snackbarService.open).toHaveBeenCalledWith(
        'large',
        'error',
        CONSTANTS.ERROR_MESSAGES.GENERIC_DOWNLOAD_MESSAGE,
        'download',
        { dismissAfter: 4000 }
      );
    }));
  });

  describe('resetEclipseDialog', () => {
    it('should reset component state and unsubscribe', () => {
      const unsubscribeSpy = spyOn(component.stepDetailsSubscription, 'unsubscribe');
      
      component.resetEclipseDialog();
      
      expect(component.isDetailsAPICalled).toBeFalse();
      expect(component.isJobLogAPICalled).toBeFalse();
      expect(component.isLoading).toBeFalse();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call resetEclipseDialog', () => {
      const resetSpy = spyOn(component, 'resetEclipseDialog');
      
      component.ngOnDestroy();
      
      expect(resetSpy).toHaveBeenCalled();
    });
  });
});




////////////////////////cevwrvervefv


import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { DialogModule, DialogComponent, IconModule, TabModule, CalloutModule, IconButtonModule, SnackbarService } from '@nielseniq/athena-core';
import { CommonModule } from '@angular/common';
import { DetailsDataService } from '../../../services/details-data.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilityService } from '../../../services/utility.service';
import { of, throwError } from 'rxjs';
import { CONSTANTS } from '../../../../assets/app.constants';
import { JobLogDataModel } from '../../../models/fup/job-log.model';
import { DetailsModel } from '../../../models/fup/details.model';
import { Result } from '../../../models/common/result.model';
import * as FileSaver from 'file-saver';

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;
  let detailsDataService: jasmine.SpyObj<DetailsDataService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  const mockJobLogData: JobLogDataModel = {
    status: {
      timestamp: '2023-01-01',
      responseStatus: 'OK',
      responseCode: '200'
    },
    body: {
      company: 'Test Company',
      node: 'Test Node',
      uproc: 'Test Uproc',
      session: 'Test Session',
      management_Unit: 'Test Unit',
      uproc_number: 123,
      session_number: 456,
      launch: 'Test Launch',
      monId: 789,
      logContent: 'Test log content',
      isTruncated: true
    }
  };

  const mockDetailsData: DetailsModel = {
    status: {
      timestamp: '2023-01-01',
      responseStatus: 'OK',
      responseCode: '200'
    },
    body: {
      session: 'Test Session',
      week: 'Test Week',
      step: 'Test Step',
      status: 'OK',
      result: 'SUCCESS',
      execution_server: 'Test Server',
      unix_process: '12345',
      job_id: 'JOB123',
      management_unit: 'Test Unit',
      command_line: 'test command'
    }
  };

  beforeEach(async () => {
    // Create spy objects with proper typing
    detailsDataService = jasmine.createSpyObj<DetailsDataService>('DetailsDataService', 
      ['getJobLogDetails', 'getJobDetails', 'downloadFile']);
    loaderService = jasmine.createSpyObj<LoaderService>('LoaderService', ['getNIQLoader']);
    utilityService = jasmine.createSpyObj<UtilityService>('UtilityService', ['openSnackBar']);
    snackbarService = jasmine.createSpyObj<SnackbarService>('SnackbarService', ['open']);

    // Configure return values
    detailsDataService.getJobLogDetails.and.returnValue(of(mockJobLogData));
    detailsDataService.getJobDetails.and.returnValue(of(mockDetailsData));
    detailsDataService.downloadFile.and.returnValue(of(new Blob(['test content'])));
    loaderService.getNIQLoader.and.returnValue('loader-image-path');

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DialogModule,
        IconModule,
        TabModule,
        CalloutModule,
        IconButtonModule
      ],
      declarations: [EclipseAthenaDialogComponent],
      providers: [
        { provide: DetailsDataService, useValue: detailsDataService },
        { provide: LoaderService, useValue: loaderService },
        { provide: UtilityService, useValue: utilityService },
        { provide: SnackbarService, useValue: snackbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
    
    // Initialize required inputs
    component.title = 'Test Title';
    component.monId = 123;
    component.detailsPath = 'test/path';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.primaryTabTitle).toBe(CONSTANTS.PRIMARY_TAB_TITLE);
    expect(component.secondaryTabTitle).toBe(CONSTANTS.SECONDARY_TAB_TITLE);
    expect(component.tabSelected).toBe(component.primaryTab);
    expect(component.genericErrMsg).toBe(CONSTANTS.ERROR_MESSAGES.GENERIC_DATA_MESSAGE);
    expect(component.NIQLoaderImage).toBe('loader-image-path');
  });

  describe('openDialog', () => {
    it('should open dialog and load job log data', () => {
      // Need to initialize ViewChild first
      component.dialogBox = TestBed.createComponent(DialogComponent).componentInstance;
      const openSpy = spyOn(component.dialogBox, 'open');
      
      component.openDialog(123);
      
      expect(openSpy).toHaveBeenCalled();
      expect(component.isLoading).toBe(true);
      expect(detailsDataService.getJobLogDetails).toHaveBeenCalledWith(123);
    });
  });

  // ... (keep all other test cases the same as before)

  describe('downloadFile', () => {
    it('should download file successfully', fakeAsync(() => {
      component.sessionName = 'TestSession';
      component.uproc = 'TestUproc';
      component.monId = 123;
      
      component.downloadFile();
      tick();
      
      expect(detailsDataService.downloadFile).toHaveBeenCalledWith(123, 'TestSession', 'TestUproc');
      expect(FileSaver.saveAs).toHaveBeenCalled();
      expect(utilityService.openSnackBar).toHaveBeenCalledWith(
        'large',
        'success',
        'File downloading begins.It will take few minutes.',
        'success'
      );
    }));

    it('should handle download error with specific error message', fakeAsync(() => {
      const errorResponse = {
        error: {
          error: 'Download failed'
        }
      };
      detailsDataService.downloadFile.and.returnValue(throwError(() => errorResponse));
      
      component.downloadFile();
      tick();
      
      expect(snackbarService.open).toHaveBeenCalledWith(
        'large',
        'error',
        'Download failed',
        'download',
        { dismissAfter: 4000 }
      );
    }));

    it('should handle download error with generic error message', fakeAsync(() => {
      detailsDataService.downloadFile.and.returnValue(throwError(() => new Error('Test Error')));
      
      component.downloadFile();
      tick();
      
      expect(snackbarService.open).toHaveBeenCalledWith(
        'large',
        'error',
        CONSTANTS.ERROR_MESSAGES.GENERIC_DOWNLOAD_MESSAGE,
        'download',
        { dismissAfter: 4000 }
      );
    }));
  });

  // ... (keep remaining test cases the same)
});
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EclipseAthenaDialogComponent } from './eclipse-athena-dialog.component';
import { DialogModule, DialogComponent, IconModule, TabModule, CalloutModule, IconButtonModule, SnackbarService } from '@nielseniq/athena-core';
import { CommonModule } from '@angular/common';
import { DetailsDataService } from '../../../services/details-data.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilityService } from '../../../services/utility.service';
import { of, throwError } from 'rxjs';
import { CONSTANTS } from '../../../../assets/app.constants';
import { saveAs } from 'file-saver';
import { JobLogDataModel } from '../../../models/fup/job-log.model';
import { DetailsModel } from '../../../models/fup/details.model';
import { Result } from '../../../models/common/result.model';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('EclipseAthenaDialogComponent', () => {
  let component: EclipseAthenaDialogComponent;
  let fixture: ComponentFixture<EclipseAthenaDialogComponent>;
  let mockDetailsDataService: Partial<DetailsDataService>;
  let mockLoaderService: Partial<LoaderService>;
  let mockUtilityService: Partial<UtilityService>;
  let mockSnackbarService: Partial<SnackbarService>;

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
    mockDetailsDataService = {
      getJobLogDetails: jest.fn().mockReturnValue(of(mockJobLogData)),
      getJobDetails: jest.fn().mockReturnValue(of(mockDetailsData)),
      downloadFile: jest.fn().mockReturnValue(of(new Blob(['test content'])))
    };

    mockLoaderService = {
      getNIQLoader: jest.fn().mockReturnValue('loader-image-path')
    };

    mockUtilityService = {
      openSnackBar: jest.fn()
    };

    mockSnackbarService = {
      open: jest.fn()
    };

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
        { provide: DetailsDataService, useValue: mockDetailsDataService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: SnackbarService, useValue: mockSnackbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EclipseAthenaDialogComponent);
    component = fixture.componentInstance;
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
      const openSpy = jest.spyOn(component.dialogBox, 'open');
      component.openDialog(123);
      
      expect(openSpy).toHaveBeenCalled();
      expect(component.isLoading).toBe(true);
      expect(mockDetailsDataService.getJobLogDetails).toHaveBeenCalledWith(123);
    });
  });

  describe('onCloseDialogEvent', () => {
    it('should reset API call flags', () => {
      component.isDetailsAPICalled = true;
      component.isJobLogAPICalled = true;
      
      component.onCloseDialogEvent();
      
      expect(component.isDetailsAPICalled).toBe(false);
      expect(component.isJobLogAPICalled).toBe(false);
    });
  });

  describe('onDialogCloseIconClick', () => {
    it('should reset API call flags', () => {
      component.isDetailsAPICalled = true;
      component.isJobLogAPICalled = true;
      
      component.onDialogCloseIconClick();
      
      expect(component.isDetailsAPICalled).toBe(false);
      expect(component.isJobLogAPICalled).toBe(false);
    });
  });

  describe('onSelectedChange', () => {
    it('should load details data when secondary tab is selected', () => {
      component.onSelectedChange(component.secondaryTab, 123);
      
      expect(component.tabSelected).toBe(component.secondaryTab);
      expect(component.isPrimaryTabActive).toBe(false);
      expect(component.isSecondaryTabActive).toBe(true);
      expect(mockDetailsDataService.getJobDetails).toHaveBeenCalledWith(123, 'test/path');
    });

    it('should not call details API if already called', () => {
      component.isDetailsAPICalled = true;
      component.onSelectedChange(component.secondaryTab, 123);
      
      expect(mockDetailsDataService.getJobDetails).not.toHaveBeenCalled();
    });

    it('should load job log data when primary tab is selected', () => {
      component.onSelectedChange(component.primaryTab, 123);
      
      expect(component.tabSelected).toBe(component.primaryTab);
      expect(component.isPrimaryTabActive).toBe(true);
      expect(component.isSecondaryTabActive).toBe(false);
      expect(mockDetailsDataService.getJobLogDetails).toHaveBeenCalledWith(123);
    });

    it('should not call job log API if already called', () => {
      component.isJobLogAPICalled = true;
      component.onSelectedChange(component.primaryTab, 123);
      
      expect(mockDetailsDataService.getJobLogDetails).not.toHaveBeenCalled();
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
      });
      expect(component.isDetailsAPICalled).toBe(true);
      expect(component.isLoading).toBe(false);
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
      (mockDetailsDataService.getJobDetails as jest.Mock).mockReturnValue(throwError(() => errorResponse));
      
      component.getDetailsData();
      tick();
      
      expect(component.isLoading).toBe(false);
      expect(component.isSecondaryTabActive).toBe(false);
      expect(component.hasError).toBe(true);
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
      expect(component.isLogTruncated).toBe(true);
      expect(component.isJobLogAPICalled).toBe(true);
      expect(component.isLoading).toBe(false);
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
      (mockDetailsDataService.getJobLogDetails as jest.Mock).mockReturnValue(of(emptyResponse));
      
      component.getJobLogData(123);
      tick();
      
      expect(component.hasError).toBe(true);
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
      (mockDetailsDataService.getJobLogDetails as jest.Mock).mockReturnValue(throwError(() => errorResponse));
      
      component.getJobLogData(123);
      tick();
      
      expect(component.isLoading).toBe(false);
      expect(component.isPrimaryTabActive).toBe(false);
      expect(component.hasError).toBe(true);
      expect(component.errorCode).toBe('404');
      expect(component.errorMessage).toBe('Not Found');
    }));

    it('should handle generic error when error structure is unexpected', fakeAsync(() => {
      (mockDetailsDataService.getJobLogDetails as jest.Mock).mockReturnValue(throwError(() => new Error('Test Error')));
      
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
      
      expect(mockDetailsDataService.downloadFile).toHaveBeenCalledWith(123, 'TestSession', 'TestUproc');
      expect(saveAs).toHaveBeenCalled();
      expect(mockUtilityService.openSnackBar).toHaveBeenCalledWith(
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
      (mockDetailsDataService.downloadFile as jest.Mock).mockReturnValue(throwError(() => errorResponse));
      
      component.downloadFile();
      tick();
      
      expect(mockSnackbarService.open).toHaveBeenCalledWith(
        'large',
        'error',
        'Download failed',
        'download',
        { dismissAfter: 4000 }
      );
    }));

    it('should handle download error with generic error message', fakeAsync(() => {
      (mockDetailsDataService.downloadFile as jest.Mock).mockReturnValue(throwError(() => new Error('Test Error')));
      
      component.downloadFile();
      tick();
      
      expect(mockSnackbarService.open).toHaveBeenCalledWith(
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
      const unsubscribeSpy = jest.spyOn(component.stepDetailsSubscription, 'unsubscribe');
      
      component.resetEclipseDialog();
      
      expect(component.isDetailsAPICalled).toBe(false);
      expect(component.isJobLogAPICalled).toBe(false);
      expect(component.isLoading).toBe(false);
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call resetEclipseDialog', () => {
      const resetSpy = jest.spyOn(component, 'resetEclipseDialog');
      
      component.ngOnDestroy();
      
      expect(resetSpy).toHaveBeenCalled();
    });
  });
});
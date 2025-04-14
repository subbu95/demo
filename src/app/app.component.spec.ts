import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:15:67 - error TS2344: Type '"getDetailsData"' does not satisfy the constraint 'keyof DetailsDataService'.

15   let mockDetailsService: jasmine.SpyObj<Pick<DetailsDataService, 'getDetailsData'>>;
                                                                     ~~~~~~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:17:63 - error TS2344: Type '"downloadFile"' does not satisfy the constraint 'keyof UtilityService'.

17   let mockUtilityService: jasmine.SpyObj<Pick<UtilityService, 'downloadFile'>>;
                                                                 ~~~~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:46:5 - error TS18046: 'mockDetailsService.getDetailsData' is of type 'unknown'.

46     mockDetailsService.getDetailsData.and.returnValue(of([{ label: 'Status', value: 'OK' }]));
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:47:15 - error TS2339: Property 'ngOnInit' does not exist on type 'EclipseAthenaDialogComponent'.

47     component.ngOnInit();
                 ~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:59:5 - error TS18046: 'mockDetailsService.getDetailsData' is of type 'unknown'.

59     mockDetailsService.getDetailsData.and.returnValue(of(mockData));
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:69:5 - error TS18046: 'mockDetailsService.getDetailsData' is of type 'unknown'.

69     mockDetailsService.getDetailsData.and.returnValue(throwError(() => new Error('Failure')));
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:76:21 - error TS2339: Property 'closeDialog' does not exist on type 'EclipseAthenaDialogComponent'.

76     spyOn(component.closeDialog, 'emit');
                       ~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:78:22 - error TS2339: Property 'closeDialog' does not exist on type 'EclipseAthenaDialogComponent'.

78     expect(component.closeDialog.emit).toHaveBeenCalled();
                        ~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:82:21 - error TS2339: Property 'closeDialog' does not exist on type 'EclipseAthenaDialogComponent'.

82     spyOn(component.closeDialog, 'emit');
                       ~~~~~~~~~~~


Error: src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:84:22 - error TS2339: Property 'closeDialog' does not exist on type 'EclipseAthenaDialogComponent'.

84     expect(component.closeDialog.emit).toHaveBeenCalled();
});

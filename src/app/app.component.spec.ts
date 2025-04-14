import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
LOG: Error: Test Error
Error: Test Error
    at errorFactory (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:348:72)
    at Observable._subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/observable/throwError.js:5:51)
    at Observable._trySubscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:37:25)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:31:30)
    at errorContext (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/errorContext.js:19:9)
    at Observable.subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:22:21)
    at EclipseAthenaDialogComponent.downloadFile (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.ts:196:94)
    at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:350:17)
    at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:1702:26)
    at _ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:369:28)
Chrome Headless 131.0.0.0 (Windows 10): Executed 29 of 126 SUCCESS (0 secs / 1.304 secs)
LOG: Error: Test Error
Error: Test Error
    at errorFactory (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:348:72)
    at Observable._subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/observable/throwError.js:5:51)
    at Observable._trySubscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:37:25)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:31:30)
    at errorContext (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/errorContext.js:19:9)
    at Observable.subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:22:21)
    at EclipseAthenaDialogComponent.downloadFile (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.ts:196:94)
    at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:350:17)
    at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:1702:26)
Chrome Headless 131.0.0.0 (Windows 10) EclipseAthenaDialogComponent downloadFile should download file successfully FAILED
        Expected spy saveAs to have been called.
            at <Jasmine>
            at UserContext.apply (src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:318:36)
            at UserContext.apply (node_modules/zone.js/fesm2015/zone-testing.js:1702:26)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
LOG: Object{error: Object{error: 'Download failed'}}
Chrome Headless 131.0.0.0 (Windows 10): Executed 31 of 126 (1 FAILED) (0 secs / 1.337 secs)
Chrome Headless 131.0.0.0 (Windows 10) EclipseAthenaDialogComponent should initialize with correct default values FAILED
        Expected undefined to be 'loader-image-path'.
            at <Jasmine>
            at UserContext.apply (src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:130:38)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
LOG: Object{error: Object{status: Object{errors: ..., responseStatus: ...}}}
Chrome Headless 131.0.0.0 (Windows 10): Executed 36 of 126 (2 FAILED) (0 secs / 1.399 secs)
LOG: Error: Test Error
Error: Test Error
    at errorFactory (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:298:76)
    at Observable._subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/observable/throwError.js:5:51)
    at Observable._trySubscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:37:25)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:31:30)
    at errorContext (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/errorContext.js:19:9)
    at Observable.subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:22:21)
    at init (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/operators/finalize.js:5:20)
    at SafeSubscriber.call (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/lift.js:10:28)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:26:30)
    at errorContext (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/errorContext.js:19:9)
Chrome Headless 131.0.0.0 (Windows 10): Executed 39 of 126 (2 FAILED) (0 secs / 1.442 secs)
LOG: Error: Test Error
Error: Test Error
    at errorFactory (http://localhost:9876/_karma_webpack_/webpack:/src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:298:76)
    at Observable._subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/observable/throwError.js:5:51)
    at Observable._trySubscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:37:25)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:31:30)
    at errorContext (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/errorContext.js:19:9)
    at Observable.subscribe (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:22:21)
    at init (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/operators/finalize.js:5:20)
    at SafeSubscriber.call (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/util/lift.js:10:28)
    at cb (http://localhost:9876/_karma_webpack_/webpack:/node_modules/rxjs/dist/esm/internal/Observable.js:26:30)
LOG: Object{error: Object{status: Object{errors: ..., responseStatus: ...}}}
Chrome Headless 131.0.0.0 (Windows 10): Executed 40 of 126 (2 FAILED) (0 secs / 1.455 secs)
Chrome Headless 131.0.0.0 (Windows 10) EclipseAthenaDialogComponent openDialog should open dialog and load job log data FAILED
        Expected false to be true.
            at <Jasmine>
            at UserContext.apply (src/app/shared/components/eclipse-athena-dialog/eclipse-athena-dialog.component.spec.ts:139:35)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
WARN: 'Spec 'IframeTrackerDirective should create an instance' has no expectations.'
Chrome Headless 131.0.0.0 (Windows 10): Executed 85 of 126 (3 FAILED) (0 secs / 2.397 secs)
Chrome Headless 131.0.0.0 (Windows 10): Executed 126 of 126 (3 FAILED) (3.302 secs / 2.794 secs)
TOTAL: 3 FAILED, 123 SUCCESS
});

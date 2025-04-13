import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'demo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, demo');
  });
 NavBarComponent Keyboard Navigation should close dropdown with Escape FAILED
        Expected spy closeDropdown to have been called.
            at <Jasmine>
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:286:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should open submenu with ArrowRight or Enter FAILED
        Expected spy openSubmenu to have been called with:
          [ Object({ menuItemName: 'Item 1', url: '/item1' }), 0 ]
        but it was never called.
            at <Jasmine>
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:270:37)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
Chrome Headless 131.0.0.0 (Windows 10) ERROR
  Some of your tests did a full page reload!
Chrome Headless 131.0.0.0 (Windows 10): Executed 92 of 119 (2 FAILED) ERROR (0 secs / 2.1 secs)
Chrome Headless 131.0.0.0 (Windows 10) ERROR
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to external URL FAILED
        Expected 'http://localhost:9876/context.html' to be 'http://external.com'.
            at <Jasmine>
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:307:36)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
Chrome Headless 131.0.0.0 (Windows 10): Executed 93 of 119 (3 FAILED) ERROR (2.344 secs / 2.112 secs)
13 04 2025 15:05:28.308:ERROR [karma-server]: UncaughtException: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:109:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
13 04 2025 15:05:28.308:ERROR [karma-server]: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:109:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with external URL FAILED
        Expected spy open to have been called with:
          [ 'http://external.com', '_blank' ]
        but it was never called.
            at <Jasmine>
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:353:27)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
Chrome Headless 131.0.0.0 (Windows 10): Executed 94 of 119 (4 FAILED) ERROR (2.344 secs / 2.126 secs)
13 04 2025 15:05:28.311:ERROR [karma-server]: UncaughtException: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:109:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
13 04 2025 15:05:28.311:ERROR [karma-server]: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:109:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
Chrome Headless 131.0.0.0 (Windows 10): Executed 95 of 119 (4 FAILED) ERROR (2.344 secs / 2.139 secs)
13 04 2025 15:05:28.313:ERROR [karma-server]: UncaughtException: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:107:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
    at runNextTicks (node:internal/process/task_queues:64:3)
    at process.processImmediate (node:internal/timers:454:9)
13 04 2025 15:05:28.314:ERROR [karma-server]: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:107:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
    at runNextTicks (node:internal/process/task_queues:64:3)
Chrome Headless 131.0.0.0 (Windows 10): Executed 96 of 119 (4 FAILED) ERROR (2.344 secs / 2.139 secs)
13 04 2025 15:05:28.315:ERROR [karma-server]: UncaughtException: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:107:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
    at runNextTicks (node:internal/process/task_queues:64:3)
    at process.processImmediate (node:internal/timers:454:9)
13 04 2025 15:05:28.316:ERROR [karma-server]: TypeError: Cannot read properties of null (reading '32382597')
    at SonarQubeUnitReporter.specSuccess.specSkipped.specFailure (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma-sonarqube-unit-reporter\index.js:149:27)
    at BaseReporter.onSpecComplete (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\reporters\base.js:107:12)
    at Server.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\events.js:40:26)
    at Server.emit (node:events:530:35)
    at Browser.onResult (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:164:20)
    at Socket.<anonymous> (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\karma\lib\browser.js:218:42)
    at Socket.emit (node:events:518:28)
    at Socket.emitUntyped (C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\typed-events.js:69:22)
    at C:\Users\998259\AngularWorkspace\cip-eclipse-ux\feature-BCNEB-28098\cip-eclipse-ux\node_modules\socket.io\dist\socket.js:697:39
    at processTicksAndRejections (node:internal/process/task_queues:77:11)
    at runNextTicks (node:internal/process/task_queues:64:3)
    at process.processImmediate (node:internal/timers:454:9)
   
});

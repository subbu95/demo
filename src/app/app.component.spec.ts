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
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent should create FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate down with ArrowDown FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate up with ArrowUp FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should open submenu with ArrowRight or Enter FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should go back with ArrowLeft FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should close dropdown with Escape FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to dashboard FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to external URL using window.open FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate to POS using router FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should set language FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with legacy URL FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with external URL FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with internal URL FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent ngOnDestroy should unsubscribe from subscriptions FAILED
        Not run because a beforeAll function failed. The beforeAll failure will be reported on the suite that caused it.
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) ERROR
  An error was thrown in afterAll
  TypeError: Cannot redefine property: location
      at Function.defineProperty (<anonymous>)
      at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/src/app/layout/nav-bar/nav-bar.component.spec.ts:72:12)
      at _ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:369:28)
      at ProxyZoneSpec.onInvoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
      at _ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:368:34)
      at ZoneImpl.run (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:111:43)
      at runInTestZone (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:216:38)
      at UserContext.<anonymous> (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:234:32)
      at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10): Executed 24 of 109 (14 FAILED) ERROR (0 secs / 0.172 secs)
Chrome Headless 131.0.0.0 (Windows 10) ERROR
  An error was thrown in afterAll
  TypeError: Cannot redefine property: location
      at Function.defineProperty (<anonymous>)
      at UserContext.apply (http://localhost:9876/_karma_webpack_/webpack:/src/app/layout/nav-bar/nav-bar.component.spec.ts:72:12)
      at _ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:369:28)
      at ProxyZoneSpec.onInvoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
      at _ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:368:34)
      at ZoneImpl.run (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone.js:111:43)
      at runInTestZone (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:216:38)
      at UserContext.<anonymous> (http://localhost:9876/_karma_webpack_/webpack:/node_modules/zone.js/fesm2015/zone-testing.js:234:32)
});

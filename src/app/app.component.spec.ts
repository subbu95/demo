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
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate up with ArrowUp FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should open submenu with ArrowRight or Enter FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should close dropdown with Escape FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate down with ArrowDown FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should go back with ArrowLeft FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent ngOnDestroy should unsubscribe from subscriptions FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to dashboard FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate to POS using router FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with external URL FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should set language FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with internal URL FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with legacy URL FAILED
        TypeError: Cannot delete property 'location' of [object Window]
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:75:5)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
        TypeError: Cannot read properties of undefined (reading 'complete')
            at UserContext.apply (src/app/layout/nav-bar/nav-bar.component.spec.ts:134:20)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at ZoneImpl.run (node_modules/zone.js/fesm2015/zone.js:111:43)
            at runInTestZone (node_modules/zone.js/fesm2015/zone-testing.js:216:38)
            at UserContext.<anonymous> (node_modules/zone.js/fesm2015/zone-testing.js:234:32)
            at <Jasmine>
Chrome Headless 131.0.0.0 (Windows 10) ERROR
});

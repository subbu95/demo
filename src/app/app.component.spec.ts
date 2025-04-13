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
   NavBarComponent ngOnDestroy should unsubscribe from subscriptions FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')

   NavBarComponent should create FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')

   NavBarComponent getMenuData should handle error when fetching menu data FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')

  NavBarComponent getMenuData should fetch menu data successfully FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
   NavBarComponent Menu Navigation should open language menu FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)

   NavBarComponent Menu Navigation should toggle dropdown when opening same menu FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')

   NavBarComponent Menu Navigation should open submenu FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')

              Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Menu Navigation should go back to previous menu FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
  Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Menu Navigation should close dropdown FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent User Actions should logout user FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent ngOnInit should call getMenuData on initialization FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to dashboard FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with external URL FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with internal URL FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should redirect to external URL FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate to POS using router FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should navigate from menu with legacy URL FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Navigation Methods should set language FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should open submenu with ArrowRight or Enter FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should close dropdown with Escape FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should go back with ArrowLeft FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate down with ArrowDown FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
Chrome Headless 131.0.0.0 (Windows 10) NavBarComponent Keyboard Navigation should navigate up with ArrowUp FAILED
        TypeError: Cannot read properties of undefined (reading 'subscribe')
            at new NavBarComponent (src/app/layout/nav-bar/nav-bar.component.ts:48:52)
            at NodeInjectorFactory.factory (ng:///NavBarComponent/ɵfac.js:4:10)
            at getNodeInjectable (node_modules/@angular/core/fesm2022/core.mjs:5984:44)
            at createRootComponent (node_modules/@angular/core/fesm2022/core.mjs:15998:35)
            at ComponentFactory.create (node_modules/@angular/core/fesm2022/core.mjs:15858:29)
            at apply (node_modules/@angular/core/fesm2022/testing.mjs:1979:51)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:369:28)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2081:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:368:34)
            at Object.onInvoke (node_modules/@angular/core/fesm2022/core.mjs:14882:33)
});

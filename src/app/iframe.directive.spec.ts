import { Component, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { IframeTrackerDirective } from './iframe-tracker.directive';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Component({
  template: `<iframe eclipseIframeTracker (iframeClick)="onIframeClicked()" [debug]="true"></iframe>`,
  standalone: true,
  imports: [IframeTrackerDirective]
})
class TestHostComponent {
  clickSpy = jasmine.createSpy('iframeClick');
  onIframeClicked() {
    this.clickSpy();
  }
}

describe('IframeTrackerDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the directive instance', () => {
    const directiveEl = fixture.debugElement.query(By.directive(IframeTrackerDirective));
    expect(directiveEl).not.toBeNull();
  });

  it('should set iframeMouseOver to true on mouseover', () => {
    const iframeDebug = fixture.debugElement.query(By.css('iframe'));
    iframeDebug.triggerEventHandler('mouseover', {});
    fixture.detectChanges();

    const directiveInstance = iframeDebug.injector.get(IframeTrackerDirective) as any;
    expect(directiveInstance['iframeMouseOver']).toBeTrue();
  });

  it('should set iframeMouseOver to false on mouseout', () => {
    const iframeDebug = fixture.debugElement.query(By.css('iframe'));
    iframeDebug.triggerEventHandler('mouseover', {});
    iframeDebug.triggerEventHandler('mouseout', {});
    fixture.detectChanges();

    const directiveInstance = iframeDebug.injector.get(IframeTrackerDirective) as any;
    expect(directiveInstance['iframeMouseOver']).toBeFalse();
  });

  it('should emit iframeClick when window is blurred and iframeMouseOver is true', fakeAsync(() => {
    const iframeDebug = fixture.debugElement.query(By.css('iframe'));
    iframeDebug.triggerEventHandler('mouseover', {});
    fixture.detectChanges();

    window.dispatchEvent(new Event('blur'));
    tick(); // simulate time passage for async handlers

    const hostComponent = fixture.componentInstance;
    expect(hostComponent.clickSpy).toHaveBeenCalled();
  }));

  it('should not emit iframeClick when iframeMouseOver is false', fakeAsync(() => {
    const iframeDebug = fixture.debugElement.query(By.css('iframe'));
    iframeDebug.triggerEventHandler('mouseout', {});
    fixture.detectChanges();

    window.dispatchEvent(new Event('blur'));
    tick();

    const hostComponent = fixture.componentInstance;
    expect(hostComponent.clickSpy).not.toHaveBeenCalled();
  }));
});

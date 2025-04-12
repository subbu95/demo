import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyTable001Component } from './sticky-table001.component';

describe('StickyTable001Component', () => {
  let component: StickyTable001Component;
  let fixture: ComponentFixture<StickyTable001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyTable001Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyTable001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

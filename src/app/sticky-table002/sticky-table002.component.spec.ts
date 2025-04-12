import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyTable002Component } from './sticky-table002.component';

describe('StickyTable002Component', () => {
  let component: StickyTable002Component;
  let fixture: ComponentFixture<StickyTable002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyTable002Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyTable002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

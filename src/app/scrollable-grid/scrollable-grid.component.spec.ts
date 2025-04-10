import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableGridComponent } from './scrollable-grid.component';

describe('ScrollableGridComponent', () => {
  let component: ScrollableGridComponent;
  let fixture: ComponentFixture<ScrollableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown002Component } from './dropdown002.component';

describe('Dropdown002Component', () => {
  let component: Dropdown002Component;
  let fixture: ComponentFixture<Dropdown002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown002Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown003Component } from './dropdown003.component';

describe('Dropdown003Component', () => {
  let component: Dropdown003Component;
  let fixture: ComponentFixture<Dropdown003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown003Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdown003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
